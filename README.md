# NFT-DAPP
### 环境配置
* 如果配了运行不了,或者出了什么问题，请联系我来操作一波
* 全程在Windows下开发
* 安装truffle, ganache的最新版本(直至2021/11/5)
* 安装Metamask钱包
* 版本^0.8.9的solidity编译器(一般会随truffle安装好，truffle也会跟随pragma进行自动安装)
* 安装IPFS，这里选择的是IPFS Desktop
  ![image](https://github.com/AXEwiges/NFT-DAPP/blob/main/imgs/ipfs_main.jpg)
* 配置IPFS的跨域资源共享CORS配置，具体方法因系统而异，可以在其配置界面直接修改，这一步的作用是让NFT上传到IPFS，不配置的话会导致上传fetch失败
  ![image](https://github.com/AXEwiges/NFT-DAPP/blob/main/imgs/ipfs_config.jpg)
  参考链接：
  * https://www.pianshen.com/article/9518824760/
  * 其他和IPFS CORS相关的链接
* 开启ganache区块链，配置端口参考truffle-config.js文件，本项目运行在localhost:8545 port:1337
  ![image](https://github.com/AXEwiges/NFT-DAPP/blob/main/imgs/ganache_main.jpg)
  随后在项目根目录下，运行：
  > truffle compile
  之后将build/contracts/下得到的abi粘贴到frontend/src/assert/abis.js中，这里不需要额外操作，因为版本相同，结果相同
  运行以下指令以在ganache中部署合约：
  > truffle deploy
  随后在ganache的contracts中点击`Market`合约并查看地址，粘贴到abis.js中，这一步的地址是因人而异的，所以必须操作
  ![image](https://github.com/AXEwiges/NFT-DAPP/blob/main/imgs/ganache_contracts.jpg)
* 安装npm, yarn, 并配置react开发环境
  在本项目根目录路径下，运行以下指令以配置环境，并开始运行React程序
  > npm install

  > yarn start
 * 至此，应当可以看到localhost:3000下个人NFT的界面(初始为空)
  ![image](https://github.com/AXEwiges/NFT-DAPP/blob/main/imgs/sample.jpg)
