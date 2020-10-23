from PIL import Image
import os
import sys

index = 0
prefix = sys.argv[1]

for file in os.listdir('.'):
    if file[-2:] == 'py':
        continue

    if file == '.DS_Store':
        continue

    # 截取图片底部20px大小水印
    img = Image.open(file)
    width = img.size[0]
    height = img.size[1]
    img2 = img.crop((0, 0, width, height - 20))
    img2.save(file, quality=100)

    # 更改图片的名字 为 rose.0.jpg || rose.1998.jpg
    new_name = prefix + "." + str(index) + ".jpg"
    os.rename(file, new_name)

    index += 1
