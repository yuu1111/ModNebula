# かめぱランチャー Modパック追加方法

かめぱわぁ～るどランチャーにModパックを追加することで、Mod企画をみんなで手軽に遊ぶことができる。

今回はModパックを追加する手順を解説する。

---

## 1. 前準備

### ModNebulaバイナリをダウンロードする

以下のサイトからModNebulaの最新リリースをダウンロードして展開する

[ModNebula Releases](https://github.com/yuu1111/ModNebula/releases)

`modnebula-windows.zip` をダウンロードして、適当な場所(例: `C:\tools\modnebula`)に展開してください。

### Java17をインストールする

すでに入っている人はスキップしてOK

[Downloads for Amazon Corretto 17 - Amazon Corretto 17](https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/downloads-list.html)

User guide for Amazon Corretto 17, the Amazon version of OpenJDK.

### ModPacksリポジトリをクローンする

クローンはGitのリポジトリをGit形式でダウンロードすること。

(zip形式でダウンロードすると、編集後のデータをアップできなくなるので使わないこと)

以下の手順でダウンロードする:

```bash
# C直下のgitディレクトリに移動
mkdir C:\git  # C:\gitがないときだけ
cd C:\git\

# Modパックをクローン
git clone https://github.com/KamePowerWorld/ModPacks.git
```

### .env を設定する

ModNebulaを展開したフォルダ(例: `C:\tools\modnebula`)にある `.env` ファイルをテキストエディタで開く。

中身を以下のように編集する:

```env
JAVA_EXECUTABLE=<Javaのインストールフォルダへのフルパス>\bin\java.exe
ROOT=C:\git\ModPacks
BASE_URL=http://127.0.0.1:8080/
```

`<Javaのインストールフォルダへのフルパス>` は

```
C:\Program Files\Amazon Corretto\jdk17.0.14_7\bin\java.exe
```

みたいな感じのパスです。

### 初回ビルドを実行する

ModNebulaのフォルダにある `1_Modパックをビルド.bat` をダブルクリックして実行する。

正常にビルドが完了すれば、セットアップ完了です。

---

## 2. パックにModを追加する

ModパックにModを追加する方法は2つある。

### 1つめ: CurseForgeのModパックを作成してインポートする方法

もちろん、CurseForgeで配布されているModパックをそのまま使うこともできます。

Prismランチャーを使用して独自Modパックを作成する方法は[こちら]を参照。

### 2つめ: 手動で追加(上級者向け)

---

## CurseForgeのModパックからインポートする方法

### CurseForge形式のModパックを用意する

`C:\git\ModPacks\modpacks\curseforge` にCurseForge形式のModパックのzipを配置する。

### Modパックをインポートする

ModNebulaのフォルダにある `2_CurseForgeからインポート.bat` をダブルクリックして実行する。

1. Modパック名を入力(例: `LegacyCraft`)
2. zipファイル名を入力(例: `LegacyCraft-v2.2.1-release-cf.zip`)
3. Enterを押してインポート開始

インポートが完了すると、次のステップが表示されます。

### servermeta.jsonを編集する

生成された `servers\<Modパック名>\servermeta.json` を開き、`icon`, `address`, `discord`の各種 `""` の間の文字列を以下のように消す:

```json
{
  "$schema": "file:///D:/softdata/git/KPWModPacks/schemas/ServerMetaSchema.schema.json",
  "meta": {
    "version": "1.0.0",
    "name": "KPWComputerCraft (Minecraft 1.20.1)",
    "description": "KPWComputerCraft Running Minecraft 1.20.1 (Forge v47.3.0)",
    "icon": "",
    "address": "",
    "discord": {
      "shortId": "",
      "largeImageText": "",
      "largeImageKey": ""
    },
    "mainServer": false,
    "autoconnect": false
  },
  "forge": {
    "version": "47.3.0"
  },
  "untrackedFiles": []
}
```

---

## 手動でModを追加する方法

ミスが多いので手動導入は非推奨です。できればCurseForgeのModパックからインポートすることをおすすめします。

FabricのModパックは「CurseForgeのModパックからインポートする方法」の手順でうまくいかない事が多いのでこちらの手順を使用してください。

---

## 3. Modパックをビルドする(忘れがちなので注意)

**この手順を忘れると、Modが直リンク化されず、GitHubで再配布してしまうことになるので、忘れずに行ってください。**

ModNebulaのフォルダにある `1_Modパックをビルド.bat` をダブルクリックして実行する。

この処理で、Modのjarから情報を抽出し、`.link.json`(ModへのURLが記載されたjson)への転記処理を行います。

---

## 4. 手元でModパックが起動できるか確認する

手元でHTTPサーバーを立て、正しくModパックがビルドされているか確認する。

**この手順を行う前にかめぱわぁ～るどランチャーを v0.8.6以降に更新する必要があります。**

### ローカルHTTPサーバーを起動する

ModNebulaのフォルダにある `3_ローカルサーバー起動.bat` をダブルクリックして実行する。

`http://localhost:8080` でサーバーが起動します。

**このウィンドウは閉じないでください。サーバーを停止するには Ctrl+C を押してください。**

### かめぱわぁ～るどランチャーをテスト起動

**別のコマンドプロンプトまたはエクスプローラーから**、ModNebulaのフォルダにある `4_ランチャーテスト起動.bat` をダブルクリックして実行する。

コマンドから起動すると、↓のようにURLが表示されるはず。

うまく接続できていればローカルHTTPサーバーにリクエストが来るはず。

手元で追加したModパックが一覧に増えているはず。

---

## 5. GitHubにアップロードする

1. `C:\git\ModPacks` をVSCodeで開く
2. Gitタブを開く
3. 変更内容コメントを入れてコミット → 変更の同期

---

## トラブルシューティング

### Q: ↓のエラーが出た

A: 以下のコマンドでGitHubのユーザー名とメールアドレスを登録する

```bash
# ユーザ名の設定(GitHubのユーザー名に揃えるといい)
git config user.name <ユーザ名>

# メールアドレスの設定(GitHubのメールアドレスと揃えると良いが、別に違うのでも良い)
# ここで設定したメールアドレスは公開されるので注意！！
git config user.email <メールアドレス>
```

### Q: "JAVA_EXECUTABLE が見つかりません" というエラーが出た

A: `.env` ファイルの `JAVA_EXECUTABLE` のパスが正しいか確認してください。

Java 17がインストールされているか確認してください。

### Q: "ROOT が見つかりません" というエラーが出た

A: `.env` ファイルの `ROOT` のパスが正しいか確認してください。

`C:\git\ModPacks` フォルダが存在するか確認してください。

### Q: ランチャーテスト起動で "ランチャーが見つかりません" と出た

A: かめぱわぁ～るどランチャーがインストールされているか確認してください。

インストール場所が標準と異なる場合は、`4_ランチャーテスト起動.bat` を編集してパスを修正してください。

---

## 6. GitHub上でプルリクエストを作成する

↓からプルリクエストを送る。

[ModPacksをプルリクエスト](https://github.com/KamePowerWorld/ModPacks/pulls)

**お疲れ様でした。**

---

## 各batファイルの説明

### 1_Modパックをビルド.bat

Modパックをビルドし、distribution.jsonを生成します。

**使い方:**
1. batファイルをダブルクリック
2. ビルドが完了するまで待つ(数分かかる場合があります)

**注意点:**
- この処理を忘れると、Modが直リンク化されません
- 初回セットアップ時、およびModパック追加後に必ず実行してください

### 2_CurseForgeからインポート.bat

CurseForge形式のModパックをインポートします。

**使い方:**
1. `C:\git\ModPacks\modpacks\curseforge` にzipファイルを配置
2. batファイルをダブルクリック
3. Modパック名とzipファイル名を入力

**注意点:**
- zipファイル名は拡張子(.zip)まで含めて入力してください
- インポート後は必ず `servermeta.json` を編集してください
- 編集後、`1_Modパックをビルド.bat` を実行してください

### 3_ローカルサーバー起動.bat

ローカルHTTPサーバーを起動します。

**使い方:**
1. batファイルをダブルクリック
2. サーバーが起動したら、ウィンドウを閉じないでください
3. 停止するには Ctrl+C を押してください

**注意点:**
- `http://localhost:8080` でアクセスできます
- ランチャーテスト時は起動したままにしてください

### 4_ランチャーテスト起動.bat

かめぱわぁ～るどランチャーをローカルサーバーに接続して起動します。

**使い方:**
1. 事前に `3_ローカルサーバー起動.bat` でサーバーを起動
2. batファイルをダブルクリック
3. ランチャーが起動し、追加したModパックが表示されることを確認

**注意点:**
- 必ず `3_ローカルサーバー起動.bat` を先に起動してください
- ランチャーのバージョンは v0.8.6以降が必要です

---
