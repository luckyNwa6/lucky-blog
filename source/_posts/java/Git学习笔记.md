---
title: Git 的使用
cover: 'https://imgs.luckynwa.top/blog/gitIcon.png'
description: Git 相关的学习笔记
categories: Java
tags: Git
comments: false
abbrlink: 6724
date: 2022-01-01 11:22:21
swiper_index: 4
swiper_description: 'Git 相关的学习笔记'
---

git 软件链接：https://pan.baidu.com/s/1XaG8mcIjMwNtlC1w_FLyMg?pwd=6666
提取码：6666
--来自百度网盘超级会员 V1 的分享 git 软件，默认安装就行

# 了解知识

(1)工作区：处理工作区域 ，状态四种如下
未被 git 管理 未跟踪(2 个红？？)
已被管理里 3 种
未修改
已修改（工作区文件和仓库不一样,红色 M，放入暂存区变绿 M）
已暂存(git add)

(2)暂存区：已完成工作的临时存放区域，等待被提交

(3)git 仓库： 最终提交的区域(git commit -m "这里是备注")

# 文件夹关联 github

```shell
1、先去桌面空白右键git bash 打开git终端 ，下面换成自己的账号名和邮箱
git config --global user.name "luckyNwa"
git config --global user.email "1656213092@qq.com"
git config --global user.email "2428284043@qq.com"
查看是否有配置 git config user.name  || git config user.email

2、然后去需要的项目文件夹那右键，打开git bash，git init  初始化项目

3、查当前目录状态 git status  或者加个 -s  发现是未跟踪文件是2个红？？

4、然后git add 文件名带后缀 跟踪它加入缓存区   一次性添加多个暂存区  git add .

5、git commit -m "这里是备注"

6、github上创建一个仓库,然后配置SSH，这样每次访问github不需要输入密码,创建的仓库下面的代码选择ssh关联，如下
…or create a new repository on the command line
echo "# springcloud-demo" >> README.md    创建md文档内容引号里的
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:luckyaaaa/springcloud-demo.git
git push -u origin main
由于前面我们已经init文件夹并且提交给git，所以选择下面这种，关联github仓库
…or push an existing repository from the command line
git remote add origin git@github.com:luckyaaaa/springcloud-demo.git   关联
git branch -M main            设置分支
git push -u origin main         第一次推送

7、当本地新增的一个文件，并且提交给git，但是github是不会更新的，需要
git push   将最新的本地仓库推送给远程
```

# SSH 配置

1、打开 git bash 粘贴下面代码，邮箱记得改自己的

```SHELL
ssh-keygen -t rsa -b 4096 -C "1656213092@qq.com"
```

```
ssh-keygen -t rsa -b 4096 -C "2428284043@qq.com"
```

然后回车 3 次 生成文件在 C:\Users\Administrator\\.ssh 中打开 id_rsa.pub 复制里面内容

2、登录 github 点头像-setting-ssh and... -New SSH key

将刚刚复制的粘贴到 key 对应文本框 在 title 文本框里任意写一个名称

3、在 bash 里输入

```SHELL
ssh -T git@github.com
```

在输入 yes 就会欢迎，配置成功

# idea 关联 github

1、idea 推送到远程

(1)idea 里点击设置，搜 git 路径，File | Settings | Version Control | Git，配置 path to git executable 路径就是 git.exe 的位置,然后保存

(2)点击 VCS->import into ...->create Git... 初始化 git 仓库，弹框里选择这个项目即可
，项目右上角出现 Git 和 2 个箭头，左边拉取，右边提交

(3)在 github 上创建一个空白仓库,保存 ssh 的链接

(4)IDEA 里选择右边提交，左边那些暂存区的全部勾选即可，因为不需要的都被.gitignore 忽略了。Message 里写一下备注,在点击 Commit。都选确定，点击左下 vesion control 里 log，看记录

(5)VCS->git->push 在点击 define remote 默认 origin，再把 ssh 地址贴上，点击 ok，在点击 push，就关联远程仓库

(6)代码发生变化，点击提交右边那个，写一下备注，点击 commit 的下拉选项里的 and push，因为第一次没有远程仓库所以 commit。有就点第二个，即提交并推送

(7)多人出现冲突情况,A 可以提交成功并且推送到了远程仓库,B 先 commit 保存到 git 仓库，不 push。工作时候先 pull 再 push，就是点击拉取左边那个。选默认 ok。会弹出合并时候有冲突。先 close 弹框。冲突的会爆红，发现 head 是当前，已经远程的，删掉修改成想要的，将爆红这个类右键 git->add 一下。再右边按键 push，A 再 pull 就拿到最新的

(8)分支创建点击 idea 右下角 git：master，创建删除啥的都有，最好是在 log 里面直接需要的地方右键

(9)可以配置 idea 终端为 bash 终端 setting 里搜 Terminal,把 shell path 改成 bash.exe 路径

2、远程克隆到本地，复制远程的克隆的 ssh
VCS->checkout...->git->输入 ssh 的 url，然后看提示吧，可以新的项目打开

# vscode 关联 github

1、vscode 打开文件夹，点击右边侧边栏源代码关联那个地方，初始化仓库
2、点击文件右边的加号，就是加入暂存区，输入提交的备注，点击提交到 git 仓库
3、当你文件内容修改，那个文件旁边出现 M,+暂存更改，另个返回,右上角...里的内联视图可以在一个页面里看到
4、想把分支关联到 github 上，点击源代码关联旁边...点击远程-远程库，输入 url，绑定，在 push 上去就行了

# 常用指令

```shell
git commit -a -m "备注"  直接从工作区->git仓库
git rm -f 文件名  git仓库和工作区同时移除 查看这个文件状态可以看到是D
git rm --cached 文件名  只从git仓库移除，工作区会保留 将不在跟踪 还需要push一下远程也删
git log 查看历史记录
clear 清空终端
git clone 远程仓库的地址
git clone -b 分支名 地址 // 克隆分支的代码到本地
git status -s // 查看状态
git push --force-with-lease origin 本地分支名:远端分支名   强推送

git push -u origin master  和远程分支关联

分支相关
git branch 查看git仓库所有分支列表 *表当前处于
git branch 新分支名称    基于当前所处分支创建，此时新分支代码和当前分支一样
git checkout 分支名称  切换分支
git checkout -b 分支名称  创建并切换到该分支
git checkout master 切换到主分支再合并其他分支 git merge 其他分支名称
git branch -d 分支名称 删除指定分支,需要在别的分支上
git push -u 远程仓库名称(默认origin) 本地分支名称   或者加 ：远程分支名称 不加默认
git remote show origin  查看远程仓库所有的分支列表
git checkout 远程分支名称 将远程的分支下载到本地
git checkout -b 新名称  origin/远程分支名称  将远程分支弄到本地并且换个名称
git pull 将远程分支最新代码拉取到本地
git push origin --delete 远程分支名称  删除远程分支 把--delete换-D强制删除
git merge 合并分支
```

# gitee 使用

```shell
git init
git remote add oringin 仓库地址  绑定远程仓库
git checkout -b develop  创建本地和远程一样的分支
git pull oringin develop    把要的拿下来

gid add .
git commit -m '备注
git push oringin 分支名


我删除了本来C:\Users\Administrator\.ssh目录，重新生成
ssh-keygen

pub文件，将内容复制到gitee和github的ssh中保存：
https://gitee.com/profile/sshkeys
https://github.com/settings/keys

ssh -T git@gitee.com
ssh -T git@github.com
都yes成功

```

# 遇到问题

```shell
fatal: refusing to merge unrelated histories
因为两个根本不相干的 git 库， 一个是本地库， 一个是远端库， 然后本地要去推送到远端， 远端觉得这个本地库跟自己不相干， 所以告知无法合并

解决方案一
git clone远程仓库到本地，将需要推送的内容放到该仓库下，然后提交上去，这样算是一次update操作

解决方案二
使用强制合并
github指令：git pull origin master --allow-unrelated-historie
gitee指令：git pull oringin master --allow-unrelated-historie
先ESC，然后敲:q!  再回车
再push就ok,  git push -u origin master   git push -u oringin master
如果不行就是没有解决掉分支问题，强行推送覆盖
git push --force-with-lease origin 本地分支名:远端分支名   强推送

```

```shell
    Can't Update
        No tracked branch configured for branch develop or the branch doesn't exist.
        To make your branch track a remote branch call, for example,
        git branch --set-upstream-to=origin/develop develop (show balloon)

    别人上传到远程仓库后，你没有及时的同步（拉取）到本地，但是你同时又添加了一些内容（提交），以致于你在提交时，它会检测到你之前从远程仓库拉取的时候的仓库状态和现在的不一样。于是，它为了安全起见拒绝了你的提交（然后就报了这个错误）。

方法1、先合并之前的历史，再进行提交——提倡使用
（1）先把git的东西fetch到你本地然后merge后再push
git fetch oringin develop
git merge oringin FETCH_HEAD
先抓取远程仓库的更新到本地，然后与你的本地仓库合并，（如果有冲突就要解决冲突后再合并，冲突问题比较复杂，这里就不详细说了），这样就可以使远程仓库和你本地仓库一致了，然后就可以提交修改了。
（2）这2句命令等价于
$ git pull oringin develop
但是使用git fetch + git merge 更加安全。
（3）git pull --rebase oringin develop
重定基，可以是历史更加统一，即使提交历史趋向于一条直线。

补充：他们之间的关系
git pull = git fetch + git merge FETCH_HEAD
git pull --rebase =  git fetch + git rebase FETCH_HEAD

方法2、丢弃之前的历史，强推——谨慎使用
强推，即利用强覆盖方式用你本地的代码替代git仓库内的内容

$ git push -f  或者 $ git push --force

官方文档提示：This flag disables these checks, and can cause the remote repository to lose commits; use it with care.（即：此标志禁用这些检查，并可能导致远程存储库丢失提交；小心使用。）

俗话说得好：“强扭的瓜不甜”，强制（暴力）执行总会产生一些不好的结果，应慎重考虑是否使用该命令！！！

```

# GitHub 部署静态网站

1、部署到自己 2428 的号上面，账号就叫 luckyNwa

2、测试本地 git 环境，直接 ssh 覆盖比较快

```SHELL
ssh-keygen -t rsa -b 4096 -C "2428284043@qq.com"
```

3、创建 luckyNwa.github.io 仓库，到时候直接这个网站访问

4、去 setting--->ssh---->删除旧的新增一个----->复制 C:\Users\FF\.ssh 里 pub 文件到配置那

5、hexo d 同步
