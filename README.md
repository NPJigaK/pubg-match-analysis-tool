We've released a completely redesigned, upgraded tool. You can access it [here](https://kagijpn.github.io/pubg-match-replayer/).
# pubg-match-analysis-tool
※ 日本の方向けのドキュメントは[こちら](https://github.com/KagiJPN/pubg-match-analysis-tool/blob/master/README_JP.md)！

This tool is a web application that ports the functionality of the **SteinsGG** analysis system for PLAYERUNKNOWN'S BATTLEGROUNDS.

The site I used to operate was run by my server, where data acquisition and processing were performed. However, it was tough on the wallet to keep the server running 24/7, so I decided to terminate the service. In this **pubg-match-analysis-tool**, all data acquisition and processing are done in the browser. This eliminated the need to run a server in the background, making it possible to reduce costs almost to zero. This is why it was possible to re-launch the service.

You can use this tool from [here](https://kagijpn.github.io/pubg-match-analysis-tool/top/).

Recommended environment: Google Chrome

※ If you have **AdBlock** extensions installed in your browser, the tool may not work correctly.

## Differences from SteinsGG
To retrieve data, you will need an API Key. In addition to the traditional **REGION** and **PUBG NAME**, you will also need to enter your **API Key** when searching. For details, please refer to [How to Issue API Key](#How-to-Issue-API-Key).

## How to Issue API Key
Get your API Key at the [PUBG Developer Portal](https://developer.pubg.com/).

Click on the **GET YOUR OWN API KEY** link and follow the instructions. Registration is free. (It's an English site, but the operations are not difficult)

Eventually, you will be taken to a page like the one below, where you should copy the string where it says **API KEY**.

![pubg-apikey](https://raw.githubusercontent.com/KagiJPN/pubg-bluezone-predictor/master/docs/resource/img/pubg-apikey.JPG)

### Tips
This tool can register multiple API Keys. You can issue up to 5 API Keys per account on the [PUBG Developer Portal](https://developer.pubg.com/). We recommend issuing and registering all 5.

## Contributing
There may be parts of the explanation that are difficult to understand. If you have any questions, feel free to contact me on [my Twitter](https://twitter.com/KagiJPN)!
