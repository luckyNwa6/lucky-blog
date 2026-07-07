---
title: Stable Diffusion 环境搭建与使用指南
cover: https://cloud.luckynwa.top/profile/yys/204.webp
description: 会当凌绝顶，一览众山小
categories: 人工智能
tags: Tool
comments: true
abbrlink: ai4
summary: >-
  本文介绍了 Stable Diffusion 的环境搭建与使用方法。首先讲解 Python 和 CUDA 环境的安装配置，以及整合包的下载和模型存放位置。
  接着详细说明了文生图和图生图的使用技巧，包括通用提示词、不同风格的关键词写法、权重调整方法。
  最后推荐了二次元、写真和 2.5D 等多种风格的热门模型，以及 ComfyUI 翻译插件的安装方式。
date: 2025-06-22 06:34:51
---

# 环境

python-3.10.6-amd64.exe 安装记得全局 path 勾选，其他默认即可

cmd python -V 查看版本

cmd 输入 nvidia-smi 查看 cuda 的版本 12.1

https://developer.nvidia.com/cuda-toolkit-archive cuda 官网

选 local 安装

https://space.bilibili.com/12566101/video

下载 stable diffusion 整合包

训练模型的位置 D:\bgsoft\sd-webui-aki\sd-webui-aki-v4\models\Stable-diffusion

后缀 safetensors| ckpt 大模型

还需要去网页那点击刷新按钮，

旁边还有一个VAE（变分自解码器调色滤镜）D:\bgsoft\sd-webui-aki\sd-webui-aki-v4\models\VAE

# 使用

## 通用提示词

\*正面提示词后

```apl
(masterpiece:1,2), best quality, masterpiece, highres, original, extremely detailed wallpaper, perfect lighting,(extremely detailed CG:1.2), drawing, paintbrush,
```

插画风

```css
illustration,painting,paintbrush
```

二次风

```css
anime,comic,gane CG
```

写实

```css
photorealistic,realistic,photograph
```

\*负面提示词后

```ABAP
NSFW, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, (ugly:1.331), (duplicate:1.331), (morbid:1.21), (mutilated:1.21), (tranny:1.331), mutated hands, (poorly drawn hands:1.5), blurry, (bad anatomy:1.21), (bad proportions:1.331), extra limbs, (disfigured:1.331), (missing arms:1.331), (extra legs:1.331), (fused fingers:1.61051), (too many fingers:1.61051), (unclear eyes:1.331), lowers, bad hands, missing fingers, extra digit,bad hands, missing fingers, (((extra arms and legs))),
```

:后面是权重

## 文生图

### 二次元风格

默认20算力高步数30-40 | 采样方法推荐带+，DPM+ | 勾面部修复 | 宽800高450

![image-20240805205031133](https://cdn.jsdelivr.net/gh/luckyNwa6/lucky-pic-bed@main/img/image-20240805205031133.png)

![image-20240805211042457](https://cdn.jsdelivr.net/gh/luckyNwa6/lucky-pic-bed@main/img/image-20240805211042457.png)

## 图生图

重绘幅度是和原图有多像，其他和文生图差不多

随机种子 -1就是每次都是新的，可以看到生成的图中有Seed: 3010602137这个可以保持风格基本一致，换背景

勾选高清修复

会先生低分辨率--->再生高分辨率的

R-E.. |二次元 选 ..+Anime6B 0 0.7

2 0 0

一般都是低分辨率下炼丹，再借助固定随机种子，来进行高分辨率修复，放大安全区0.3-0.5.高了就让ai现象了

3、结合 chatGPT

将我给你说的一段话转换为 AI 绘画关键字。请转化下面这段话并且中英文双语回答我：这个美女在一间安静的图书馆里，她坐在一张舒适的椅子上，身穿清新简洁的白色衬衫，秀发轻轻地梳了一下，留在肩膀上，散发着淡淡的香气。她深深地沉浸在一本书中，眉头微皱，似乎在思考着书中所阐述的概念，不时翻动书页，倾听着心中的声音。周围的环境十分安静，只有书页翻动的声音以及微弱的呼吸声，显得更加静谧而优雅。整个场景充满了一种优雅、安静、充满知识氛围的感觉，让人心生向往。

ai:英文关键词：Quiet Library, Comfortable Chair, White Shirt, Gentle Scent, Immersed in Book, Concept, Quietness, Elegance, Knowledge Atmosphere, Wistfulness.

中文关键词：安静的图书馆，舒适的椅子，白色衬衫，淡淡的香气，沉浸在书中，概念，宁静，优雅，知识氛围，向往之感。

如何写提示词？

内容提示词：人物及主题特征 穿衣颜色 发色 面部 五官 肢体动作 室内、外 小细节 白天黑夜 特定时段 光环境 天空 距离 人物比例 观察视角 镜头类型

标准化提示词：通用高画质、特定分辨率、插画风、二次元、写实系

给提示词加()、{}来提高权重 削弱[]

补充：painting,illustration,anime,game cg

通用高画质：best quality,ultra detailed,masterpiece,8k

特定超高分辨率类型 ：unreal engine rendered,extremely detailed CG unity 8k wallpaper,

下面是反面

NSFW, (worst quality2), low quality2),(normal quality,2) lowres, normal quality,([grayscale)l,skin spots, acnes, skin blemishes, age spot,(ugly.1.331),(duplicate1.331) (morbid:1.21),(mutlated:1.21),(tranny,1.331), mutated hands,(poorly drawn hands:1.5), blurry,(bad anatomy.1.21),(bad proportions:1.331, extra limbs,(disigured1.331,(missing arms:1.331),(extra legs:1.31,(fused fingers;1.61051),(too many fingers:1.61051),(unclear eyes:1.331), lowers, bad hands, missing fingers, extra digit,bad hands, missing fingers,(lextra arms and legs)

案例 1

Realistic Beauty Girl: A realistic depiction of a beautiful young girl, with long blonde hair, a smallgolden hairband, blue eyes, a royal sister-like look, a cold face, and a white shirt. Her portrait isdetailed and intricate, with 8K wallpapers, gorgeous girls, and a stunning upper body. She has acold expression and is looking at the viewer, wearing school uniform, sailor suit, and crazy whitehair. She has red eyes, detailed double eyes with a black crosshair, handsome, glowing, andtheatrical angle.Her 8K wallpaper is detailed, with a girl with red eyes, white hair, a ponytail, longhair, light pink inner hair, white windbreaker, inner blue clothes, studio photography, masterpiece,movie highlight hair, and exquisite hands. Her exterior features include nipples, small chest, flatchest, highest quality, very detailed, masterpiece,ultra-details, illustration, extremely delicate andbeautiful loli, very detailed eyes and face, detailed eye details, masterpiece, best illustration, aquablue eyes, bright eyes, movie lights, extremely delicate and beautiful loli, gradient eyes, white hair,red eyes, and twelve-year-old loli,(best quality},{{imasterpiecell}},{highres} ,original,extremely detailed wallpaper,1girl,{an extremely delicate and beautifull}

Lowres, bad anatomy, bad hands, text, error,missing fingers, extra digit,fewerdigits, cropped, worst quality,low quality,normal quality,jpeg artifacts,signature, watermark, username, blurry,missing arms,long neck, Humpbacked

使用二次元风格模型：illustration,painting, sketch, drawing, painting, comic, anime, catoon

真实：photography, photo, realistic, photorealistic,RAW photo

2.5d:3D, render,chibi, digital art, concept art, {realistic}

## 模型总结

二次元：

1.最受欢迎的二次元模型：Anything

2精致度满满，室内外场景优秀：counterfeit

3.魔幻感十足：dreamlike diffusion

真实：

1.真实朴素：Realistic vision

2.照片级：Lofi

3.精细的写实风格：deliberate

2.5D

1.动漫角色的二次创作，即真实又二次元：never ending dream

2.超现实的画面：Protogen x3.4 (Photorealism)

3.国风、小人书、水墨风：guofeng

3 拓展： 富有现代感的建筑（dvArch - Multi-Prompt Archittecture Tuned Model)

富有魔幻感的场景(Cheese Daddy's Landscapes mix)

富有高级感的平面设计(Graphic design_2.0)

# ComfyUI

翻译插件 https://github.com/a63976659/ComfyUI-Chinese-Translation

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/a63976659/ComfyUI-Chinese-Translation.git
```

TODO
