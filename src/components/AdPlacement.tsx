"use client";

/**
 * Google広告配置コンポーネント
 *
 * 診断結果表示前にインタースティシャル風の広告枠を表示する。
 * 本番環境ではGoogle AdSenseのコードに置き換える。
 */

interface AdPlacementProps {
  /** 広告スロットの種類 */
  slot: 'result-interstitial' | 'banner-top' | 'banner-bottom' | 'in-feed';
  /** 診断テーマカラー */
  themeColor?: string;
}

export default function AdPlacement({ slot, themeColor = '#FF6BE8' }: AdPlacementProps) {
  // 広告スロットに応じたサイズ設定
  const slotStyles: Record<string, React.CSSProperties> = {
    'result-interstitial': {
      width: '100%',
      minHeight: 250,
      maxWidth: 480,
      margin: '0 auto 24px',
      borderRadius: 16,
    },
    'banner-top': {
      width: '100%',
      minHeight: 90,
      maxWidth: 728,
      margin: '0 auto 16px',
      borderRadius: 12,
    },
    'banner-bottom': {
      width: '100%',
      minHeight: 90,
      maxWidth: 728,
      margin: '16px auto 0',
      borderRadius: 12,
    },
    'in-feed': {
      width: '100%',
      minHeight: 120,
      maxWidth: 480,
      margin: '16px auto',
      borderRadius: 12,
    },
  };

  return (
    <div
      style={{
        ...slotStyles[slot],
        background: 'rgba(255,255,255,.03)',
        border: `1px dashed rgba(255,255,255,.1)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 8,
        padding: 20,
      }}
      data-ad-slot={slot}
      data-ad-status="placeholder"
    >
      {/* 本番ではここにGoogle AdSenseのスクリプトタグを配置 */}
      {/* <ins className="adsbygoogle" data-ad-client="ca-pub-XXXXX" data-ad-slot="XXXXXX" ... /> */}
      <div
        style={{
          fontSize: 11,
          color: 'rgba(255,255,255,.25)',
          textAlign: 'center',
          letterSpacing: '0.05em',
        }}
      >
        SPONSORED
      </div>
      <div
        style={{
          fontSize: 10,
          color: 'rgba(255,255,255,.15)',
        }}
      >
        広告枠 ({slot})
      </div>
    </div>
  );
}
