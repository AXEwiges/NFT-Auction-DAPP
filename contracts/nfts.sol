// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "../frontend/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Market is ERC721URIStorage{
    string public Name;
    string public Symbol;
    //NFT代币信息
    constructor() ERC721("NFT", "NFT") {
        Name = name();
        Symbol = symbol();
    }

    struct NFT{
        string name;
        string tokenURI;
        string des;
        uint uid;
        uint price;
        address payable creator;
        address payable owner;
        bool onauction;
    }

    struct Auction{
        uint initivalue;
        uint finalvalue;
        uint endtime;
        uint nid;
        address payable provider;
        address payable receiver;
        bool on;
        bool mark;
    }

    struct history{
        uint num;
    }

    //NFT Uid
    uint public itemUid;
    //Auction Uid
    uint public auctionUid;
    //历史index
    mapping(uint => history) public hislen;
    //市场mapping
    mapping(uint => NFT) public marketBoard;
    //拍卖mapping
    mapping(uint => Auction) public auctions;
    //历史计数mapping
    mapping(uint => address[]) public Historys;

    //铸造NFT
    function createNFT(string memory _name, string memory _tokenURI, string memory _des, uint _price) external {
        address payable sender = payable(msg.sender);
        //铸造NFT
        _safeMint((msg.sender), itemUid);
        //将uid和uri一一对应
        _setTokenURI(itemUid, _tokenURI);
        //制造NFT对象
        NFT memory newNFT = NFT(
            _name, _tokenURI, _des, itemUid, _price, sender, sender, false
        );
        //将NFT加入市场
        marketBoard[itemUid] = newNFT;
        //保存所有权的历史
        Historys[itemUid].push(sender);
        //保存Index
        hislen[itemUid].num++;
        //增加 uid + 1
        itemUid++;
    }
    //获取URI
    function getURI(uint _id) public view returns (string memory){
        string memory thisURI = tokenURI(_id);
        return thisURI;
    }
    //获取所有者
    function getOwner(uint _id) public view returns (address) {
        return ownerOf(_id);
    }
    //获取历史记录长度
    function getHislen(uint _id) public view returns (uint) {
        return hislen[_id].num;
    }


    // Events that will be emitted on changes.
    event HighestBidIncreased(address bidder, uint amount);
    // The auction has ended.
    event AuctionEnded(address winner, uint amount);
    // The auction has success.
    event AuctionComplete(address from, address to);
    /// The auction has already ended.
    error AuctionAlreadyEnded();
    /// There is already a higher or equal bid.
    error BidNotHighEnough(uint highestBid);
    /// The auction has not ended yet.
    error AuctionNotYetEnded();
    /// The function auctionEnd has already been called.
    error AuctionEndAlreadyCalled();
    /// Poor
    error Poor();
    /// Wrong
    error Wrong();
    /// Not Yours
    error NotYours();
    //创建拍卖
    function createAuction(uint _uid, uint _value, uint _time) external {
        //确认真实存在
        if (!_exists(_uid))
            revert Wrong();
        //确认自身是NFT的所有人
        if (msg.sender != ownerOf(_uid))
            revert NotYours();
        
        address payable x = payable(msg.sender);
        //挂牌拍卖置位
        marketBoard[_uid].onauction = true;

        Auction memory newAuction = Auction(
            _value, _value, block.timestamp + _time, _uid,
            x, x, true, false 
        );
        auctions[_uid] = newAuction;
    }
    //出价
    function Bid(uint _id, uint price) external {
        //确认拍卖在进行
        if (auctions[_id].on == false)
            revert AuctionAlreadyEnded();
        //确认拍卖时间未结束
        if (block.timestamp > auctions[_id].endtime)
            revert AuctionAlreadyEnded();
        //确认钱包有余额
        if (price > msg.sender.balance)
            revert Poor(); 
        //确认出家够多
        if (price <= auctions[_id].finalvalue)
            revert BidNotHighEnough(auctions[_id].finalvalue);
        //更新交易现状
        auctions[_id].finalvalue = price;
        auctions[_id].provider = auctions[_id].receiver;
        auctions[_id].receiver = payable(msg.sender);
        emit HighestBidIncreased(msg.sender, price);
    }
    //声明所有权
    function claim(uint _id) public payable {
        if (block.timestamp < auctions[_id].endtime)
            revert AuctionNotYetEnded();
        if (auctions[_id].receiver != msg.sender)
            revert NotYours();
        address payable sender = payable(msg.sender);
        //更新历史记录
        Historys[_id].push(msg.sender);
        hislen[_id].num++;
        address t = marketBoard[_id].owner;
        //更新市场记录
        marketBoard[_id].owner = sender;
        marketBoard[_id].onauction = false;
        marketBoard[_id].price = auctions[_id].finalvalue;
        //这一步遇到各种问题，要命，最终还是成功了，后端搞不了就前端解决了
        //支付
        payable(ownerOf(_id)).transfer(msg.value);
        //转移所有权
        _transfer(ownerOf(_id), msg.sender, _id);
        //失败的方法
        // uint vv = auctions[_id].finalvalue;
        // payable(ownerOf(_id)).transfer(vv);
        emit AuctionComplete(t, msg.sender);
    }
}