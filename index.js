const { PublicKey } = require('@solana/web3.js');
const { RestClient, TokenTransfersWithOwnerRequest } = require("@hellomoon/api");
const fs = require('fs');
const client = new RestClient("79c6232c-09bc-4258-b1d3-b42f0bfa4948");

const main = async() => {
    const tokenMintAccount = new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263');  /// BONK token
    const owner = new PublicKey('2PFvRYt5h88ePdQXBrH3dyFmQqJHTNZYLztE847dHWYz');

    try {
        let page = 1;
        let totCount = 0;
        const transferData = [];
        while(1) {
            const data = await client.send(new TokenTransfersWithOwnerRequest({
                sourceOwner: owner.toString(),
                mint: tokenMintAccount.toString(),
                limit: 200,
                page
            }));
            // console.log(data)
            totCount += data.data.length;
            if(data.data.length == 0)
                break;
            transferData.push(...data.data)
            page++;
        }
        const destinationOwners = transferData.map(data=>data.destinationOwner).filter((value, index, array) => array.indexOf(value) === index);
        console.log(destinationOwners)
        console.log("totCount=", destinationOwners.length);
        let str = destinationOwners.toString();
        str = str.replaceAll(',','\n');
        fs.writeFileSync("result.csv", str);
        
    } catch(err) {
        console.log("Exception: ", err)
    }
}

main()