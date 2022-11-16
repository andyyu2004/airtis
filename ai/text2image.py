import os
import sys
import torch
import tempfile
from diffusers import StableDiffusionPipeline


def text2img(prompt, s3):
    model_id = "CompVis/stable-diffusion-v1-4"
    device = "mps"
    # device = "cuda" # ONLY FOR NVIDIA

    pipe = StableDiffusionPipeline.from_pretrained(model_id).to(device)
    # pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16, revision="fp16").to(device) # ONLY FOR NVIDIA

    image = pipe(prompt).images[0]

    with tempfile.NamedTemporaryFile(suffix = ".jpeg") as f: 
        image.save(f.name)

        assert s3.startswith("s3://")
        assert not f.name.startswith("s3://")

        os.system(f"aws s3 cp {f.name} {s3}")

    print(f"upload to {s3} successful")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.stderr.write("usage: text2image.py PROMPT S3_URI \n")
        sys.exit(1)
    _, prompt, s3uri = sys.argv
    text2img(prompt, s3uri)