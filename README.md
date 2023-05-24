# pubg-match-analysis-tool

pubg-match-analysis-tool is a web application that replicates the functionality of **SteinsGG**, a PLAYERUNKNOWN'S BATTLEGROUNDS analysis system.

The previous version of this tool was running on my own server, where data retrieval and processing took place. However, maintaining a server running 24/7 became burdensome, leading to the discontinuation of the service.

The current version of **pubg-match-analysis-tool** handles data retrieval and processing entirely within the browser. This eliminates the need for running a server in the background, allowing us to reduce the cost to virtually zero and relaunch the service.

You can access and use this tool by visiting [here](https://kagijpn.github.io/pubg-match-analysis-tool/top/).

## Recommended Environment
Google Chrome

Note: If you have any **AdBlock**-related extensions installed in your browser, the tool may not function properly.

## Differences from SteinsGG
To retrieve data, an API Key is now required. When performing a search, you will need to input the **REGION**, **PUBG NAME**, and **API Key**. For more details, please refer to the [API Key Generation](#api-key-generation) section.

## API Key Generation
You can obtain an API Key from the [PUBG Developer Portal](https://developer.pubg.com/).

Click on **GET YOUR OWN API KEY** and follow the instructions to create a free account (the website is in English, but the process is not overly complicated).

Once you reach the final page as shown below, please copy the string of characters labeled **API KEY**.

![pubg-apikey](https://raw.githubusercontent.com/KagiJPN/pubg-bluezone-predictor/master/docs/resource/img/pubg-apikey.JPG)

### Tips
You can register multiple API Keys for this tool as well. With a single account on the [PUBG Developer Portal](https://developer.pubg.com/), you can generate up to five API Keys. We recommend issuing and registering five API Keys.

## In Conclusion
If you have any questions or need assistance, please feel free to reach out to me on [my twitter](https://twitter.com/KagiJPN)!
