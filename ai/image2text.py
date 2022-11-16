import sys
import torch
from PIL import Image
from transformers import VisionEncoderDecoderModel, ViTFeatureExtractor, AutoTokenizer



def image2text(image):
    model = VisionEncoderDecoderModel.from_pretrained("Zayn/AICVTG_What_if_a_machine_could_create_captions_automatically")
    feature_extractor = ViTFeatureExtractor.from_pretrained("Zayn/AICVTG_What_if_a_machine_could_create_captions_automatically")
    tokenizer = AutoTokenizer.from_pretrained("Zayn/AICVTG_What_if_a_machine_could_create_captions_automatically")

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)

    gen_kwargs = {"max_length": 16, "num_beams": 8}

    def predict_step(image_paths):
        images = []
        for image_path in image_paths:
            i_image = Image.open(image_path)
            if i_image.mode != "RGB":
                i_image = i_image.convert(mode="RGB")

            images.append(i_image)

        pixel_values = feature_extractor(images=images, return_tensors="pt").pixel_values
        pixel_values = pixel_values.to(device)

        output_ids = model.generate(pixel_values, **gen_kwargs)

        preds = tokenizer.batch_decode(output_ids, skip_special_tokens=True)
        preds = [pred.strip() for pred in preds]
        return preds

    text =  predict_step([image]) # ['a woman in a hospital bed with a woman in a hospital bed']
    return text

if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.stderr.write("usage: image2text.py IAMGE\n")
        sys.exit(1)
    _, image = sys.argv
    image2text(image)