// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts@4.9.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.9.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.9.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.9.0/utils/Counters.sol";

contract Sourav is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    address payable recipient;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Sourav", "SM") {
        recipient = payable(msg.sender);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://firebasestorage.googleapis.com/v0/b/patreon-226b8.appspot.com/o/metadata%2F";
    }

    function safeMint(address to, string memory uri) public onlyOwner payable {
        (bool success, ) = recipient.call{value: 1000000000000000000}("");
        require(success, "Minting failed");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
