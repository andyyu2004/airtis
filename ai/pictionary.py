import os
import re
import sys
import torch
import pathlib
import requests
from operator import itemgetter
from PIL import Image
from diffusers import StableDiffusionPipeline
from transformers import VisionEncoderDecoderModel, ViTFeatureExtractor, AutoTokenizer, AutoFeatureExtractor


def pictionary(title):
  poster_folder = "posters"
  generated_poster_folder = "generated/posters"
  generated_text_folder = "generated/text"
  generated_plot_folder = "generated/plots"

  pathlib.Path(poster_folder).mkdir(parents=True, exist_ok=True)
  pathlib.Path(generated_poster_folder).mkdir(parents=True, exist_ok=True)
  pathlib.Path(generated_text_folder).mkdir(parents=True, exist_ok=True)
  pathlib.Path(generated_plot_folder).mkdir(parents=True, exist_ok=True)

  token = auth_token(os.environ["BRAMBLE_REFRESH_TOKEN"])
  movie = search_movie(title, token)

  print('')
  print("######")
  print(f"Title: {movie['title']}")
  print("######")
  print('')

  poster_path = f"{poster_folder}/{movie['id']}.jpg"
  generated_poster_path = f"{generated_poster_folder}/{movie['id']}.jpg"
  generated_text_path = f"{generated_text_folder}/{movie['id']}.jpg"
  generated_plot_path = f"{generated_plot_folder}/{movie['id']}.jpg"

  if not os.path.exists(poster_path):
    download_poster(movie['posterUrl'], poster_path)

  if not os.path.exists(generated_poster_path):
    prompt_poster = f"movie {movie['title']}, {movie['overview']}"
    print(f">>> Prompt: {prompt_poster}")
    text2img(prompt_poster, generated_poster_path)

  if not os.path.exists(generated_text_path):
    text = img2text(poster_path)
    prompt_text = f"movie {movie['title']}, {text}"
    print(f">>> Prompt with AI generated poster description: {prompt_text}")
    text2img(prompt_text, generated_text_path)

  if not os.path.exists(generated_plot_path):
    plot = img2plot(poster_path)
    prompt_plot = f"movie {movie['title']}, {plot}"
    print(f">>> Prompt with AI generated plot: {prompt_plot}")
    text2img(prompt_plot, generated_plot_path)

  print("HAVE FUN!!")


bramble = "https://api-int.dev.movio.co/mc-red/graph/query"

def auth_token(refresh_token):
    authMutation = {
        "query": "mutation auth($r: String!) { bramble { token: requestAccessToken(refreshToken: $r) } }",
        "variables": {
            "r": refresh_token
        }
    }
    res = requests.post(bramble, json=authMutation)
    return res.json()["data"]["bramble"]["token"]

def search_movie(title, auth):
    tmdbQuery = {
      "query": """
        query movies($title: String!) {
          tmdb {
            moviesSearch(filter: {titleLike: $title}) {
              id
              title
              overview
              genres {
                name
              }
              posterUrl
              popularity
            }
          }
        }
      """,
      "variables": {
        "title": title
      }
    }
    authheaders = {
        "Authorization": f"Bearer {auth}"
    }
    res = requests.post(bramble, json=tmdbQuery, headers=authheaders)
    movies = res.json()["data"]["tmdb"]["moviesSearch"]
    sorted_movies = sorted(movies, key=itemgetter('popularity'), reverse=True) 
    return sorted_movies[0]

def download_poster(url, path):
  r = requests.get(url, allow_redirects=True)
  open(path, 'wb+').write(r.content)

def img2plot(image_path):
  model_name_or_path = "deepklarity/poster2plot"
  device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

  model = VisionEncoderDecoderModel.from_pretrained(model_name_or_path)
  model.to(device)

  feature_extractor = AutoFeatureExtractor.from_pretrained(model.encoder.name_or_path)
  tokenizer = AutoTokenizer.from_pretrained(model.decoder.name_or_path, use_fast=True)
  if model.decoder.name_or_path == "gpt2":
      tokenizer.pad_token = tokenizer.eos_token

  with Image.open(image_path) as image:
    pixel_values = feature_extractor(images=image, return_tensors="pt").pixel_values
    pixel_values = pixel_values.to(device)

    with torch.no_grad():
        output_ids = model.generate(
            pixel_values,
            max_length=64,
            num_beams=4,
            return_dict_in_generate=True,
        ).sequences

    preds = tokenizer.batch_decode(output_ids, skip_special_tokens=True)
    regex_pattern = "[.]{2,}"
    text = re.split(regex_pattern, preds[0].strip())[0]

    return text

def img2text(image_path):
  model_id = "nlpconnect/vit-gpt2-image-captioning"

  model = VisionEncoderDecoderModel.from_pretrained(model_id)
  feature_extractor = ViTFeatureExtractor.from_pretrained(model_id)
  tokenizer = AutoTokenizer.from_pretrained(model_id)

  device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
  model.to(device)

  i_image = Image.open(image_path)

  if i_image.mode != "RGB":
    i_image = i_image.convert(mode="RGB")

  pixel_values = feature_extractor(images=i_image, return_tensors="pt").pixel_values
  pixel_values = pixel_values.to(device)

  output_ids = model.generate(pixel_values, max_length=16, num_beams=4)

  preds = tokenizer.batch_decode(output_ids, skip_special_tokens=True)
  return preds[0].strip()

def text2img(prompt, output_path):
  model_id = "CompVis/stable-diffusion-v1-4"

  if torch.cuda.is_available():
      pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16, revision="fp16").to("cuda")
  else:
      pipe = StableDiffusionPipeline.from_pretrained(model_id).to("mps")
  
  image = pipe(prompt).images[0]
  with open(output_path, "w+") as f:
    image.save(f.name)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.stderr.write("usage: pictionary.py movie mode\n")
        sys.exit(1)
    _, title = sys.argv
    pictionary(title)
