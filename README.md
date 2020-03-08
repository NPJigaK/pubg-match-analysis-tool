pubg-match-analysis-system
====

本ツールは PLAYERUNKNOWN'S BATTLEGROUNDS の分析システムであった、**SteinsGG** の機能を移植したWebアプリケーションです。

以前運用していたサイトは、私のほうでサーバーを動かしており、そちらでデータの取得や処理を行っていました。
しかし、サーバーを24時間365日動かすのはとても負担があったため、サービスを終了させました。

今回の **pubg-match-analysis-system** はデータの取得から処理まですべてブラウザの処理に任せています。
そのため、裏でサーバーを動かす必要がなくなり、コストを限りなく0にすることが出来たため、このようにもう一度サービスを展開することが出来ました。

[こちら](https://kagijpn.github.io/pubg-match-analysis-tool/top/)
から本ツールを利用することが出来ます。

利用推奨環境
Google chrome

※ **AdBlock** 系をブラウザに導入していると、正常に動作しません。

## SteinsGG との相違点
データを取得するに当たって、API Key が必要になりました。
検索する際、今までのように **REGION**, **PUBG NAME** の他に **API Key** を入力して頂きます。
詳しくは、 [APIKEYの発行方法](#APIKEYの発行方法) をご確認ください。

## APIKEYの発行方法
[PUBG Developer Portal](https://developer.pubg.com/)で API Key を取得します。

 **GET YOUR OWN API KEY**というところを押して、言われた通りに進めていき、会員登録(無料)をします。(英語のサイトですが、そこまで難しい操作はありません)
 
 最終的に、下記のようなページにいくので、**API KEY** と書かれているところの文字列をコピーしておいてください。 

![pubg-apikey](https://raw.githubusercontent.com/KagiJPN/pubg-bluezone-predictor/master/docs/resource/img/pubg-apikey.JPG)

### tips
本ツールも API Key は複数登録可能です。
[PUBG Developer Portal](https://developer.pubg.com/)のアカウント１つで最大5つまで API Key を発行することが出来ます。
5つ発行して登録することをお勧めします。

## さいごに
なにか分からないことがありましたら、私の[ディスコードサーバー](https://discord.gg/tQp8NEN)までお気軽にご連絡ください！

改善案や提案なども[ディスコードサーバー](https://discord.gg/tQp8NEN)にて、随時受け付けております。
より良いツールにアップデートするためにも、ぜひともご協力のほどよろしくお願い申し上げます。

ちなみに、[こちら](https://github.com/KagiJPN/pubg-match-analysis-tool/issues)に今後の アップデート・修正情報 をまとめています。
アップデートした内容や最新情報は、[ディスコードサーバー](https://discord.gg/tQp8NEN) にて通知していきます。

最後に、Web開発の協力者も募集してます！(Web以外でも全然OK!ディスコBOTとかも興味あり)
私はWeb開発は趣味でしか行ったことが無いので、あまり得意ではありません。もし興味ある方がいたら是非一緒になにか作りましょう！
