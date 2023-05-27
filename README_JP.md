完全にリデザインした上位互換ツールをリリースしました。[こちら](https://kagijpn.github.io/pubg-match-replayer/)からアクセスできます。
# pubg-match-analysis-tool

本ツールは、PLAYERUNKNOWN'S BATTLEGROUNDSの分析システムである**SteinsGG**の機能を移植したWebアプリケーションです。

以前運用していたサイトは、私がサーバーを稼働させており、そこでデータの取得や処理を行っていました。しかし、サーバーを24時間365日稼働させるのはお財布が厳しかったのでサービスを終了させました。
今回の**pubg-match-analysis-tool**では、データの取得から処理までをすべてブラウザ上で行います。そのため、サーバーをバックグラウンドで稼働させる必要がなく、コストをほぼゼロにすることが可能となりました。これが再度サービスを展開することが可能になった理由です。

本ツールは[ここ](https://kagijpn.github.io/pubg-match-analysis-tool/top/)から利用できます。

推奨環境：Google Chrome

※ **AdBlock** 系の拡張機能をブラウザに導入している場合、ツールが正常に動作しない場合があります。

## SteinsGGとの違い
データを取得するためには、API Keyが必要になります。検索する際には、従来の**REGION**、**PUBG NAME**に加えて、**API Key**も入力する必要があります。詳細は、[APIキーの発行方法](#APIキーの発行方法)をご覧ください。

## APIキーの発行方法
[PUBG Developer Portal](https://developer.pubg.com/)でAPI Keyを取得します。

**GET YOUR OWN API KEY**のリンクをクリックし、指示に従って進めていきます。登録は無料です。（英語のサイトですが、難しい操作はありません）

最終的に、下記のようなページに遷移しますので、**API KEY**と記載されている部分の文字列をコピーしてください。

![pubg-apikey](https://raw.githubusercontent.com/KagiJPN/pubg-bluezone-predictor/master/docs/resource/img/pubg-apikey.JPG)

### Tips
本ツールは複数のAPI Keyを登録することが可能です。[PUBG Developer Portal](https://developer.pubg.com/)のアカウント1つあたり最大5つまでAPI Keyを発行できます。5つ全てを発行し、登録することを推奨します。

## Contributing
説明が分かりづらい部分があるかもしれません。何かご不明な点がありましたら、[私のTwitter](https://twitter.com/KagiJPN)までお気軽にご連絡ください！
