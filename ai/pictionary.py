import os
import sys
import torch
import pathlib
import requests
from operator import itemgetter
from PIL import Image
from diffusers import StableDiffusionPipeline
from transformers import VisionEncoderDecoderModel, ViTFeatureExtractor, AutoTokenizer


def pictionary(title):
  pathlib.Path("posters").mkdir(exist_ok=True)
  pathlib.Path("generated").mkdir(exist_ok=True)

  token = auth_token(os.environ["BRAMBLE_REFRESH_TOKEN"])
  movie = search_movie(title, token)

  poster_path = f"posters/{movie['id']}.jpg"
  generated_poster_path = f"generated/{movie['id']}.jpg"

  if not os.path.exists(poster_path):
    download_poster(movie['posterUrl'], poster_path)

  if not os.path.exists(generated_poster_path):
    description = img2text(poster_path)
    print(f"AI overlord says: {description}")

    genres = " ".join([x["name"] for x in movie["genres"]])
    prompt = f"movie {movie['title']}, genres {genres}, {description}"
    
    text2img(prompt, generated_poster_path)
  else:
    print("Poster already generated!")

  
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


def img2text(image_path):
  model_id = "Zayn/AICVTG_What_if_a_machine_could_create_captions_automatically"

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

  output_ids = model.generate(pixel_values, max_length=16, num_beams=8)

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
        sys.stderr.write("usage: pictionary.py movie\n")
        sys.exit(1)
    _, movie = sys.argv
    pictionary(movie)
