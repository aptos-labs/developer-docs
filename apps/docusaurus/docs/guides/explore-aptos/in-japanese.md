---
title: "日本語 (In Japanese)"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Aptos Explorer の使用

[Aptos Explorer](https://explorer.aptoslabs.com/) を使用すると、Aptos ブロックチェーン上のアクティビティを詳細に調べて、トランザクション、バリデータ、アカウント情報を確認できます。 Aptos Explorer では、Aptos 上で実行されたトランザクションが正確に反映されていることを確認できます。 Aptos エコシステムには、他にも選べるエクスプローラーが[いくつかある](https://aptosfoundation.org/ecosystem/projects/explorers)ので注意してください。

Aptos Explorer は、ブロックチェーン全体をワンステップで検索できるエンジンであり、ウォレット、トランザクション、ネットワーク分析、ユーザー アカウント、スマートコントラクトなどの詳細を調べることができます。 Aptos Explorer は、ブロックチェーンの主要な要素の専用ページも提供し、Aptos に関するすべての信頼できる情報源として機能します。 ここにある多くの用語の定義については、 [Aptos Glossary](../../reference/glossary.md) を参照してください。

## ユーザ

Aptos Explorer は、ネットワークのステータスとコアのオンチェーンエンティティに関連するアクティビティをほぼリアルタイムで表示します。ユーザの目的に次のように応えます。

- アプリ開発者は、スマートコントラクトの動作と送信者と受信者のトランザクションフローを理解することができる。
- 一般ユーザーは、トランザクション、ブロック、アカウント、リソースなどの主要なエンティティに関する Aptos ブロックチェーンのアクティビティを表示および分析することができる。
- ノードオペレータはネットワークの健全性をチェックし、ノードを運用する価値を最大化しすることができる。
- トークン所有者は、トークンを委任してステーキング報酬を獲得するのに最適なノードオペレータを見つけることができる。

## 共通のタスク

ここでは Aptos Explorer で行う一般的な作業について説明します。

### ネットワークの選択

Aptos Explorer は、すべての Aptos ネットワーク (mainnet、testnet、devnet、および設定されている場合はローカル ホスト) からのデータをレンダリングします。それらの目的と違いの詳細については、[Aptos Blockchain Networks](../../nodes/networks.md) を参照してください。

Aptos Explorer でネットワークを選択するには、エクスプローラをロードし、右上の [ネットワークの選択] ドロップダウンメニューを使用して目的のネットワークを選択します。

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Select Network in Aptos Explorer"
sources={{
    light: useBaseUrl('/img/docs/0-explorer-select-network.png'),
    dark: useBaseUrl('/img/docs/0-explorer-select-network-dark.png'),
  }}
/>
</div>

### トランザクションを見つける

Aptos Explorer でトランザクションを追跡するのは、とても一般的な使い道です。アカウントアドレス、トランザクションのバージョンとハッシュ、またはブロックの高さとバージョンで検索できます。

トランザクションを見つけるには次のようにします。

1. ページの上部近くにある 「Search transactions」フィールドに値を入力します。
2. Return キーは押さないでください。
3. 検索フィールドのすぐ下に表示される、次のスクリーンショットで緑色で強調表示されているトランザクション結果をクリックします。

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Search Aptos Explorer for a transaction"
sources={{
    light: useBaseUrl('/img/docs/1-explorer-search-txn.png'),
    dark: useBaseUrl('/img/docs/1-explorer-search-txn-dark.png'),
  }}
/>
</div>

結果が[トランザクションの詳細](#トランザクションの詳細)ページに表示されます。

### アカウントアドレスを見つける

アドレスを見つける最も簡単な方法は、[Aptos Petra Wallet](https://petra.app/docs/use) を使用することです。

次に、アドレスを次の URL に追加して、その詳細を Aptos Explorer にロードします: [https://explorer.aptoslabs.com/account/](https://explorer.aptoslabs.com/account/)

例としては次のようになります。

[https://explorer.aptoslabs.com/account/0x778bdeebb67d3914b181236c2f1f4acc0e561482fc265b9a5709488a97fb3303](https://explorer.aptoslabs.com/account/0x778bdeebb67d3914b181236c2f1f4acc0e561482fc265b9a5709488a97fb3303)

使用手順については、[アカウント](#アカウント) をご覧ください。

## エクスプローラページ

このセクションでは、必要な情報を見つけるのに役立つ、Aptos Explorer で利用可能な画面について説明します。

### エクスプローラホーム

Aptos Explorer ホームページでは、Aptos コインの総供給量、現在ステーキングされているコイン、1 秒あたりのトランザクション数 (TPS)、ネットワーク上のアクティブなバリデータ、および最新のトランザクションのローリングリストをすぐに確認できます。

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer home page"
sources={{
    light: useBaseUrl('/img/docs/2-explorer-home.png'),
    dark: useBaseUrl('/img/docs/2-explorer-home-dark.png'),
  }}
/>
</div>

上部の「Transactions」タブをクリックするか、下部の「View all Transactions」をクリックして、[トランザクション](#トランザクション)ページに移動します。

### トランザクション

トランザクションページには、Aptos ブロックチェーン上のすべてのトランザクションが順番に表示され、最新のトランザクションが増え続けるリストの先頭に表示されます。

トランザクション リストで、**ハッシュ**列をシングルクリックしてトランザクションのハッシュを表示してコピーするか、ハッシュをダブルクリックしてハッシュのトランザクション詳細に直接移動します。

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Transactions page with hash highlighted"
sources={{
    light: useBaseUrl('/img/docs/3-explorer-transactions.png'),
    dark: useBaseUrl('/img/docs/3-explorer-transactions-dark.png'),
  }}
/>
</div>

それ以外の場合は、目的のトランザクションの行の他の場所をクリックして、[トランザクションの詳細](#トランザクションの詳細)ページを読み込みます。

リストの下部にあるコントロールを使用して、トランザクション履歴を遡ります。

### トランザクションの詳細

トランザクションの詳細ページには、デフォルトの「Overview」タブをはじめ、特定のトランザクションに関するすべての情報が表示されます。そこでは、トランザクションのステータス、送信者、バージョン、ガス料金などが確認できます。

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Transaction Details tab"
sources={{
    light: useBaseUrl('/img/docs/4-explorer-txn-details.png'),
    dark: useBaseUrl('/img/docs/4-explorer-txn-details-dark.png'),
  }}
/>
</div>

「Overview」を下にスクロールすると、トランザクションの署名 (`public_key`を含む) と追跡用のハッシュも表示されます。

トランザクションの詳細ページには、次のタブにさらに詳しい情報が表示されます。

### イベント

トランザクションの詳細の「Events」タブには、型やデータを含むトランザクションのシーケンス番号が表示されます。

### ペイロード

トランザクションの詳細の「Payload」タブには、使用されたトランザクションの実際のコードが表示されます。コードブロックの下部にある下矢印をクリックして展開し、すべての内容を表示します。

### 変更

トランザクションの詳細の「Changes」タブには、トランザクション内の各インデックスのアドレス、状態キー ハッシュ、データが表示されます。

### アカウント

「Account」ページでは、デフォルトの 「Transactions」タブから始まるビューセットにすべてのトランザクション、トークン、その他のリソースが集約されます。

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Accounts page"
sources={{
    light: useBaseUrl('/img/docs/5-explorer-account.png'),
    dark: useBaseUrl('/img/docs/5-explorer-account-dark.png'),
  }}
/>
</div>

アカウントアドレスを [https://explorer.aptoslabs.com/account/](https://explorer.aptoslabs.com/account/) の最後に追加することで、アカウントページをロードできます。

詳細は [アカウントアドレスを見つける](#アカウントアドレスを見つける) を参照してください。

アカウントの「Transactions」タブで、任意のトランザクションをクリックして、トランザクションの詳細ページに移動します。

メインのトランザクションページと同様に、**ハッシュ**列をシングルクリックしてトランザクションのハッシュを表示してコピーしたり、ハッシュをダブルクリックしてハッシュのトランザクション詳細に直接移動したりすることもできます。

トランザクションと同様に、 Aptos Explorer にはアカウントに関する追加情報のタブが用意されています。

### トークン

「Tokens」タブには、アカウントが所有するアセットと、トークン自体の詳細（名前、コレクションなど）が表示されます。 いずれかのアセットをクリックして、トークンの詳細ページに移動します。

#### トークンの詳細

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Token Activities tab"
sources={{
    light: useBaseUrl('/img/docs/6-explorer-token-activities.png'),
    dark: useBaseUrl('/img/docs/6-explorer-token-activities-dark.png'),
  }}
/>
</div>

どちらのタブでも、アドレスをクリックして、そのアドレスのアカウントページに移動します。

##### リソース

「Resources」タブには、アカウントで使用されるすべてのタイプのビューが表示されます。 すべてのタイプを一度に表示するには、右上の「Collapse All」トグルを使用します。

##### モジュール

「Modules」タブには、アカウントで使用されるソース コードと ABI が表示されます。 左側のサイドバーでさまざまなモジュールを選択して、特定のモジュールの移動ソース コードと ABI を表示します。 ソース コードの右上にある展開ボタンを使用してコードを展開すると、読みやすくなります。

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Modules tab"
sources={{
    light: useBaseUrl('/img/docs/10-explorer-modules.png'),
    dark: useBaseUrl('/img/docs/10-explorer-modules-dark.png'),
  }}
/>
</div>

### 情報

「Info」タブには、アカウントで使用される[シーケンス番号(sequence number)](../../reference/glossary.md#sequence-number)と認証キーが表示されます。

### ブロック

ブロックページには、Aptos ブロックチェーンにコミットされる最新のブロックの実行リストが表示されます。

    <div style={{textAlign:"center"}}>

<ThemedImage
alt="Aptos Explorer Latest Blocks page"
sources={{
    light: useBaseUrl('/img/docs/7-explorer-latest-blocks.png'),
    dark: useBaseUrl('/img/docs/7-explorer-latest-blocks-dark.png'),
  }}
/>

</div>

次の個所をクリックして機能を使えます。

- ブロックのハッシュをクリックして値を見るかコピーする
- ブロック内の最初のトランザクションに移動する最初のバージョン
- ブロック内の最後のトランザクションに移動する最後のバージョン
- ブロック ID またはその他の場所から、 [ブロックの詳細](#ブロックの詳細) ページに移動します。

### ブロックの詳細

*ブロックの詳細*ページには次の内容が含まれます。

- *「*Overview*」*タブには、ブロックの高さ、バージョン、タイムスタンプ、プロポーザー、エポック、ラウンドが含まれます。
- *「*Transactions*」* タブには、バージョン、ステータス、タイプ、ハッシュ、ガス、タイムスタンプが表示されます。

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Block details page"
sources={{
    light: useBaseUrl('/img/docs/8-explorer-block-transactions.png'),
    dark: useBaseUrl('/img/docs/8-explorer-block-transactions-dark.png'),
  }}
/>
</div>

「Overview」タブでバージョンをクリックして関連トランザクションに移動するか、提案者のアドレスをダブルクリックしてそのアドレスのアカウント ページに移動します。

「Transactions」タブで目的の行をクリックして、トランザクションの詳細ページに移動します。

### バリデータ

バリデータページには、バリデータアドレス、投票権、公開鍵、フルノードアドレス、ネットワークアドレスを含む、Aptos ブロックチェーン上のすべてのバリデータがリストアップされます。

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Validators page"
sources={{
    light: useBaseUrl('/img/docs/9-explorer-validators.png'),
    dark: useBaseUrl('/img/docs/9-explorer-validators-dark.png'),
  }}
/>
</div>

バリデータアドレスをクリックして、そのアドレスのアカウントページに移動します。公開キーまたはその他のアドレスをクリックすれば、その値を表示し、コピーできます。
