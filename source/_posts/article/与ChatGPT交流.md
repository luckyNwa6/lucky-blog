---
title: 与ChatGPT交流并搭建私人GPT
cover: "https://imgs.luckynwa.top/blog/chatGPTIcon2.png"
description: AI绘画笔记
categories: Others
tags: ChatGPT
comments: false
abbrlink: 41570
date: 2023-06-01 11:22:21
---

# 搭建

https://github.com/Yidadaa/ChatGPT-Next-Web 这个别人的项目，下拉有个 Deploy 点击进入，传入 OPENAI_API_KEY 的值和 CODE 的值 一个是 chatgpt 的 key(tb 买一个)和密码

等一段时间 Congratulations! 然后点继续

https://vercel.com/luckynwa6/chat-gpt-next-web

去配置 2 级域名 Settings ---Domains----Add-----chat.luckynwa.top

去 vercel 里的 Settings ----Environment 里修改 key 值和密码，提问的时候要是密码错误，刷新机器人

https://console.dnspod.cn/dns/luckynwa.top/record里设置2级域名

https://chat.luckynwa.top/#/ 域名访问

# AI 绘画

1、环境

python-3.10.6-amd64.exe 安装记得全局 path 勾选，其他默认即可

cmd python -V 查看版本

cmd 输入 nvidia-smi 查看 cuda 的版本 12.1

https://developer.nvidia.com/cuda-toolkit-archive cuda 官网

选 local 安装

https://space.bilibili.com/12566101/video

下载 stable diffusion 整合包

2、

训练模型的位置 D:\bgsoft\sd-webui-aki\sd-webui-aki-v4\models\Stable-diffusion

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

# chatGPT 代码提问

登录的描述： element-ui 登录页面 代码 包含验证码 界面好看
