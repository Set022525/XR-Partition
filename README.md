# WebXR AR Partition App

React Three Fiber（@react-three/fiber）とReact Three XR（@react-three/xr）を使用したWebXRベースのARアプリケーションです。現実空間に直方体型のパーティションを配置し、サイズを調整できます。

## 特徴

- 🥽 **WebXR AR対応**: 対応デバイスでAR体験を提供
- 📦 **3Dパーティション**: 直方体型のパーティションを現実空間に配置
- 🎛️ **リアルタイム編集**: サイズ、位置をリアルタイムで調整
- 🖱️ **直感的操作**: クリック、ドラッグ、ダブルクリックによる操作
- 📱 **レスポンシブ**: デスクトップ・モバイル両対応
- ⚡ **高性能**: Three.jsとReact Three Fiberによる最適化

## 技術スタック

- **フレームワーク**: Next.js 14 (App Directory)
- **3D/XR**: React Three Fiber, React Three XR
- **スタイリング**: Tailwind CSS
- **言語**: TypeScript
- **デプロイ**: Vercel対応

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
# または
yarn install
```

### 2. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

### 3. HTTPSでの開発（WebXR要件）

WebXRはHTTPS環境が必要です。本番環境では自動的にHTTPSになりますが、開発時は以下の方法でHTTPS環境を構築できます：

```bash
# mkcertを使用してローカル証明書を生成
npm install -g mkcert
mkcert -install
mkcert localhost
```

## 使用方法

### AR体験の開始

1. 対応デバイス（Android Chrome、Meta Quest Browser等）でアクセス
2. 「ARを開始」ボタンをクリック
3. カメラ権限を許可
4. デバイスを動かして空間をスキャン

### パーティション操作

- **追加**: 右側のコントロールパネルで「パーティション追加」
- **選択**: パーティションをクリック
- **移動**: 選択状態でドラッグ
- **削除**: ダブルクリック
- **サイズ変更**: 選択後、コントロールパネルのスライダーを調整

### コントロール

| 操作           | 機能                         |
| -------------- | ---------------------------- |
| クリック       | パーティション選択/選択解除  |
| ドラッグ       | 選択中のパーティションを移動 |
| ダブルクリック | パーティション削除           |
| スライダー     | サイズ調整（幅・高さ・厚さ） |

## 対応デバイス

### ARモード
- Android Chrome（WebXR Device API対応）
- Meta Quest Browser
- Microsoft HoloLens 2（Edge）
- Magic Leap 2

### 通常モード（3Dビュー）
- デスクトップブラウザ（Chrome、Firefox、Safari、Edge）
- モバイルブラウザ

## デプロイ

### Vercelへのデプロイ

```bash
# Vercel CLIを使用
npm install -g vercel
vercel

# または、GitHubと連携してデプロイ
```

### 環境変数

特別な環境変数は不要ですが、本番環境では以下の設定を推奨：

```env
# .env.local（開発環境用）
NEXT_PUBLIC_APP_ENV=development

# Vercel Environment Variables（本番環境用）
NEXT_PUBLIC_APP_ENV=production
```

## ファイル構造

```
├── app/
│   ├── components/
│   │   ├── ARPartition.tsx      # パーティションコンポーネント
│   │   ├── ControlPanel.tsx     # 操作パネル
│   │   └── WebXRScene.tsx       # メインXRシーン
│   ├── globals.css              # グローバルスタイル
│   ├── layout.tsx               # レイアウト
│   └── page.tsx                 # メインページ
├── public/
│   └── manifest.json            # PWAマニフェスト
├── next.config.js               # Next.js設定
├── package.json                 # 依存関係
└── README.md
```

## パフォーマンス最適化

- **動的インポート**: SSRを無効化してブラウザ専用コンポーネントとして実装
- **メモ化**: React.useMemo、useCallbackを適切に使用
- **Three.js最適化**: ジオメトリとマテリアルの再利用
- **レンダリング最適化**: フレームレート制御とCulling

## トラブルシューティング

### WebXRが動作しない
- HTTPSアクセスを確認
- 対応ブラウザを使用
- カメラ権限が許可されているか確認

### パフォーマンスが悪い
- デバイスの性能を確認
- パーティション数を制限
- ブラウザの開発者ツールでパフォーマンスをモニタ

### タッチ操作が反応しない
- `touch-action: none`が適用されているか確認
- モバイル用のイベントハンドラを確認


## 関連リンク

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [React Three XR](https://github.com/pmndrs/react-xr)
- [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [Next.js Documentation](https://nextjs.org/docs)
