# ときめきラボ 画像生成プロンプト集（アイコン・ロゴ・キャラクターシート）

> テーマ: 青春 x 爽やか x 透明感
> メインカラー: ティール (#2dd4bf) / スカイブルー (#38bdf8)
> ターゲット: 10代〜20代の日本人女性
> スタイル: すみっコぐらし / たまごっち風の丸い生物マスコット

---

## 1. 22体キャラクターシート（診断アイコン一覧）

### 共通スタイル指示

各キャラクターは「丸くて可愛い未知の生物」。人間ではない。すみっコぐらしやカービィのような丸いシルエットに、各診断のテーマカラーとシンボルアイテムを組み合わせる。

---

### Midjourney プロンプト（推奨: v6以降）

> 22体を1枚に収めるため、2段構成（上段11体 / 下段11体）で配置。

```
Character reference sheet, 22 cute round blob mascot creatures arranged in 2 rows of 11 on a clean solid white background. Each creature is a small, round, adorable unknown species — inspired by Sumikko Gurashi, Kirby, and Tamagotchi aesthetics. Soft cel-shaded illustration, clean outlines, no text, no labels, no names. Each creature has a unique color and a tiny themed accessory. Front-facing idle pose. Professional character design for a Japanese diagnostic web app.

Row 1 (left to right):
1. Purple (#8B5CF6) round blob with tiny DNA helix floating above its head, curious eyes
2. Gold (#FFD700) round blob wearing a tiny graduation cap, sparkly proud eyes
3. Deep purple (#9B59B6) round blob wearing a cute oversized witch hat, mystical crescent-moon eyes
4. Royal blue (#4169E1) round blob wearing a tiny knight helmet visor, determined eyes
5. Green (#2ECC71) round blob with a small leaf crown on its head, serene peaceful eyes
6. Coral pink (#FF7F7F) round blob wearing oversized cute headphones, cheerful open-mouth smile
7. Orange (#FF6B35) round blob holding a tiny glowing penlight, excited sparkling eyes
8. Sky blue (#3498DB) round blob with a tiny rocket on its back, wonder-filled upward-looking eyes
9. Dark red (#8B0000) round blob holding a small masquerade mask to the side of its face, one eye peeking
10. Teal (#00CED1) round blob holding a tiny smartphone, focused scrolling expression
11. Antique gold (#B8860B) round blob with a tiny hourglass floating beside it, wise old eyes

Row 2 (left to right):
12. Violet (#7C3AED) round blob wearing a tiny golden crown, regal confident expression
13. Pink (#EC4899) round blob wearing a cute beret and holding a tiny paintbrush, creative dreamy eyes
14. Teal (#14B8A6) round blob with a flower crown and holding a tiny teacup, relaxed peaceful expression
15. Amber (#F59E0B) round blob hugging a tiny wrapped gift box, warm happy closed eyes
16. Navy (#1E3A5F) round blob wearing a tiny clock-shaped hat, sleepy half-lidded eyes
17. Emerald (#059669) round blob wearing a tiny top hat and holding a piggy bank, shrewd cheerful eyes
18. Rose (#E11D48) round blob looking into a tiny handheld mirror, surprised expression at its own reflection
19. Blue (#2563EB) round blob wearing a brain-shaped hat with a tiny lightbulb glowing above, thoughtful eyes
20. Deep teal (#0D9488) round blob holding a tiny compass, adventurous determined eyes
21. Indigo (#4F46E5) round blob wearing round glasses and holding a tiny open book, studious focused eyes
22. Pink (#FF6BE8) round blob with tiny angel wings on its back, loving heart-shaped eyes

--ar 16:9 --s 250 --v 6.1 --style raw
```

**スタイル調整ヒント (Midjourney):**
- `--s 250` はスタイリゼーション値。もっとシンプルにしたい場合は `--s 100` に下げる
- `--style raw` はAIの過度な装飾を抑える。より可愛くしたい場合は外してもよい
- `--chaos 10` を追加するとバリエーションが増える（各キャラの個性が出やすい）
- 22体が多い場合は11体ずつ2枚に分割して `--ar 16:5` で生成すると精度が上がる
- 色が正確に出ない場合は `each creature has its own distinct color as specified` を追加

---

### DALL-E プロンプト

> DALL-Eはパラメータ記法がないため、自然言語で指示。1枚に22体は密度が高いため、2枚に分けることを推奨。

**シート1（診断1〜11）:**

```
A professional character design reference sheet showing 11 cute, round blob mascot creatures arranged in a single row on a clean white background. Each creature is a tiny, round, adorable unknown species with the aesthetic of Sumikko Gurashi and Tamagotchi — soft, simple, and kawaii. No text or labels anywhere. Soft cel-shaded flat illustration style with clean outlines.

From left to right:
1. A purple (#8B5CF6) round blob with a tiny DNA double helix floating above its head
2. A gold (#FFD700) round blob wearing a miniature graduation cap
3. A deep purple (#9B59B6) round blob in an oversized cute witch hat
4. A royal blue (#4169E1) round blob wearing a tiny knight helmet
5. A green (#2ECC71) round blob with a small crown made of leaves
6. A coral pink (#FF7F7F) round blob wearing oversized headphones
7. An orange (#FF6B35) round blob holding a tiny glowing penlight stick
8. A sky blue (#3498DB) round blob with a small rocket strapped to its back
9. A dark red (#8B0000) round blob holding a masquerade mask beside its face
10. A teal (#00CED1) round blob holding a tiny smartphone
11. An antique gold (#B8860B) round blob with a tiny hourglass beside it

Style: kawaii, Japanese mobile app character design, flat colors, white background, no shadows, clean vector-like illustration.
```

**シート2（診断12〜22）:**

```
A professional character design reference sheet showing 11 cute, round blob mascot creatures arranged in a single row on a clean white background. Same style as companion sheet — tiny, round, adorable Sumikko Gurashi / Tamagotchi aesthetic. No text or labels. Soft cel-shaded flat illustration with clean outlines.

From left to right:
12. A violet (#7C3AED) round blob wearing a tiny golden crown
13. A pink (#EC4899) round blob in a cute beret holding a tiny paintbrush
14. A teal (#14B8A6) round blob with a flower crown, holding a teacup
15. An amber (#F59E0B) round blob hugging a small wrapped gift box
16. A navy (#1E3A5F) round blob wearing a clock-shaped hat
17. An emerald (#059669) round blob in a tiny top hat holding a piggy bank
18. A rose (#E11D48) round blob gazing into a tiny handheld mirror
19. A blue (#2563EB) round blob wearing a brain-shaped hat with a lightbulb above
20. A deep teal (#0D9488) round blob holding a tiny compass
21. An indigo (#4F46E5) round blob wearing round glasses, holding an open book
22. A pink (#FF6BE8) round blob with tiny angel wings

Style: kawaii, Japanese mobile app character design, flat colors, white background, no shadows, clean vector-like illustration.
```

**スタイル調整ヒント (DALL-E):**
- DALL-Eは自然言語に強いため、感覚的な形容詞（「ぷにぷに」「もちもち」を英語化した "squishy", "soft and pudgy"）を足すと質感が良くなる
- 「no text」「no labels」「no watermark」を明示しないとテキストが混入しやすい
- 生成サイズは 1792x1024（横長）を指定すると1列に11体並べやすい
- 色の精度を上げるには「each creature must be clearly the specified hex color」を末尾に追加

---

### Stable Diffusion / Flux プロンプト

> SDXLまたはFlux推奨。LoRA「chibi」や「kawaii mascot」があれば併用すると精度向上。

**ポジティブプロンプト:**

```
(character reference sheet:1.4), (22 cute round blob mascot creatures:1.3), arranged in 2 rows of 11, clean white background, each creature is a unique color with a tiny themed accessory, (Sumikko Gurashi style:1.2), (Tamagotchi aesthetic:1.1), kawaii, chibi, round body, dot eyes, soft cel-shaded illustration, clean outlines, flat colors, professional character design, front-facing idle pose, no text, no labels, (masterpiece:1.2), (best quality:1.2)

Row 1: purple blob with DNA helix, gold blob with graduation cap, deep purple blob with witch hat, royal blue blob with knight helmet, green blob with leaf crown, coral pink blob with headphones, orange blob with penlight, sky blue blob with rocket, dark red blob with masquerade mask, teal blob with smartphone, antique gold blob with hourglass

Row 2: violet blob with crown, pink blob with beret and paintbrush, teal blob with flower crown and teacup, amber blob with gift box, navy blob with clock hat, emerald blob with top hat and piggy bank, rose blob with mirror, blue blob with brain hat and lightbulb, deep teal blob with compass, indigo blob with round glasses and book, pink blob with angel wings
```

**ネガティブプロンプト:**

```
text, watermark, signature, labels, names, numbers, UI elements, human, realistic, 3d render, photo, blurry, low quality, deformed, extra limbs, bad anatomy, dark background, gradient background, shadow, frame, border
```

**推奨設定:**
- モデル: SDXL / Flux Dev / Pony Diffusion
- 解像度: 1344 x 768（横長）または 1536 x 768
- CFGスケール: 7〜8
- サンプラー: DPM++ 2M Karras（30〜40ステップ）
- Seed固定でバリエーションを試すと統一感が出やすい

**スタイル調整ヒント (SD/Flux):**
- 22体を1枚に正確に配置するのはSDでは難しいため、11体ずつ or 6体ずつに分割生成が現実的
- `(character sheet:1.4)` の重みを `1.6` に上げるとシート形式になりやすい
- 色が混ざる場合は `each creature is a completely different solid color` を強調
- Flux系はプロンプトの自然言語理解が高いため、DALL-E用プロンプトをそのまま使っても効果的

---

## 2. アプリアイコン用プロンプト

### コンセプト

正方形（1024x1024）のアプリアイコン。ティールからスカイブルーへのグラデーション背景に、白衣を着て虫眼鏡を持つ丸い可愛いマスコットキャラクターを中央配置。テキストなし。

---

### Midjourney プロンプト

```
A mobile app icon design, a single cute round blob mascot creature centered on a smooth gradient background transitioning from teal (#2dd4bf) to sky blue (#38bdf8). The creature is a small, round, adorable unknown species with a soft pudgy body, tiny dot eyes, and rosy cheeks. It wears a tiny white lab coat that is slightly too big for it, and holds a small magnifying glass in one stubby arm, peering through it with curious sparkling eyes. The creature is white with soft pastel shading. The overall feel is fresh, transparent, youthful, and kawaii. Sumikko Gurashi meets science aesthetic. Clean vector-like illustration, no text, no typography, professional app icon quality, centered composition with breathing room around the character, subtle soft glow behind the creature

--ar 1:1 --s 200 --v 6.1 --style raw
```

**スタイル調整ヒント (Midjourney):**
- `--ar 1:1` で正方形を指定（アプリアイコンは必須）
- 角丸はアプリストアが自動適用するため、プロンプトでは不要
- キャラを小さくしすぎないこと。アイコンサイズ（60x60pt等）で視認できる程度に大きく
- 背景のグラデーションが急すぎる場合は「gentle, subtle gradient」を追加
- もっとシンプルにしたい場合は `minimalist, simple shapes` を追加
- 白衣の存在感が強すぎる場合は `tiny miniature lab coat, barely visible` に調整

---

### DALL-E プロンプト

```
A square mobile app icon illustration. A cute, round, pudgy blob mascot creature is centered on a smooth gradient background that transitions from teal (#2dd4bf) at the bottom-left to sky blue (#38bdf8) at the top-right. The creature looks like a mix of Sumikko Gurashi and Tamagotchi — extremely simple, round, and adorable. It has a soft white body with rosy pink cheeks, tiny black dot eyes full of curiosity, and stubby little arms. It wears a miniature white lab coat with tiny pockets, and holds a small magnifying glass up to one eye, peering through it playfully. The style is flat kawaii illustration with clean outlines and soft pastel shading. No text, no typography, no watermark. The composition has the character centered with comfortable padding around it. The mood is fresh, youthful, and refreshing — like a spring breeze. Professional quality suitable for iOS and Android app stores.
```

**DALL-E推奨サイズ:** 1024x1024

**スタイル調整ヒント (DALL-E):**
- 「no text」を複数回言い換えて強調すると文字混入を防げる（「no text, no letters, no typography, no writing」）
- グラデーションの方向を明示しないとランダムになるため「bottom-left to top-right」のように指定
- キャラクターの白と白衣が同化しやすいため「the lab coat has subtle light grey outlines and tiny buttons」を追加すると区別しやすい

---

### Stable Diffusion / Flux プロンプト

**ポジティブプロンプト:**

```
(mobile app icon:1.4), (single cute round blob mascot creature:1.3), centered composition, smooth gradient background from teal to sky blue, the creature wears a tiny white lab coat and holds a small magnifying glass, (Sumikko Gurashi style:1.2), kawaii, chibi, round pudgy body, dot eyes, rosy cheeks, soft cel-shaded illustration, clean outlines, flat colors, no text, no typography, professional quality, fresh and youthful mood, (masterpiece:1.2), (best quality:1.2), pastel colors, soft lighting
```

**ネガティブプロンプト:**

```
text, watermark, signature, typography, letters, words, human, realistic, 3d render, photo, blurry, low quality, deformed, dark, gloomy, complex background, frame, border, multiple characters
```

**推奨設定:**
- 解像度: 1024 x 1024
- CFGスケール: 7
- サンプラー: DPM++ 2M Karras（30ステップ）

---

## 3. ロゴ用プロンプト

### コンセプト

横長レイアウト（16:5程度）。左にマスコットキャラクター、右に「ときめきラボ」テキスト。テキストは丸ゴシック系、ティール色。サブテキスト「22の本格診断で自分を完全解析」が小さく配置。透明背景。

> **重要な注意**: AI画像生成ツールは日本語テキストの正確なレンダリングが非常に苦手です。テキスト付きロゴは以下の方法を推奨します:
> 1. キャラクター部分のみAIで生成 → テキストはFigma/Canva等で手動追加
> 2. 英語テキスト「Tokimeki Lab」で生成 → 後から日本語に差し替え
> 3. 全体のレイアウト/雰囲気のラフとして生成 → デザイナーが仕上げ

---

### Midjourney プロンプト（キャラクター部分のみ）

> テキスト部分は後から合成する前提。キャラクター単体を透明背景風に生成。

```
A single cute round blob mascot creature on a clean solid white background, the creature is a small round adorable unknown species inspired by Sumikko Gurashi and Tamagotchi. It has a soft white body with a subtle teal (#2dd4bf) tint, rosy pink cheeks, curious sparkling dot eyes, and a happy gentle smile. It wears a tiny white lab coat and holds a small magnifying glass. The creature is in a friendly welcoming pose, slightly tilted to the right as if greeting someone. Soft cel-shaded kawaii illustration, clean outlines, flat colors, no text, no background elements, professional logo mascot quality, simple and memorable silhouette

--ar 1:1 --s 200 --v 6.1 --style raw
```

**テキスト入りレイアウトの参考用（英語テキスト版）:**

```
A horizontal logo design for "Tokimeki Lab" — a Japanese diagnostic website. Left side: a cute round blob mascot creature wearing a tiny white lab coat and holding a magnifying glass, Sumikko Gurashi style, soft and adorable. Right side: the text "Tokimeki Lab" in a rounded sans-serif font in teal color (#2dd4bf), with a smaller subtitle below. The overall design is fresh, youthful, clean, and trustworthy. Flat illustration style, transparent background feel, pastel teal and sky blue color scheme, professional logo quality

--ar 16:5 --s 150 --v 6.1
```

**スタイル調整ヒント (Midjourney):**
- Midjourneyでも英語テキストが崩れることがあるため、キャラ単体生成が最も確実
- `--ar 16:5` はMidjourneyで非対応の場合があるため `--ar 3:1` で代用可
- 透明背景はMidjourneyでは直接生成不可。白背景で生成し、後からremove.bg等で透過処理
- ロゴらしいシンプルさを出すには `logo design, minimalist, simple shapes, flat` を追加

---

### DALL-E プロンプト

**キャラクター部分のみ（推奨）:**

```
A single cute round blob mascot creature for a logo, on a completely clean white background with no other elements. The creature is inspired by Sumikko Gurashi and Tamagotchi — extremely round, simple, and adorable. It has a soft white body with a very subtle teal tint, rosy pink cheeks, small black dot eyes with a curious sparkle, and a gentle happy smile. It wears a miniature white lab coat with tiny buttons and holds a small magnifying glass in its stubby right arm, looking through it playfully. The creature is in a welcoming pose, slightly leaning forward. Kawaii flat illustration style with clean outlines and soft cel-shading. No text, no letters, no typography, no background elements. The design should work as a logo mascot — simple, memorable, and recognizable at small sizes.
```

**レイアウト参考用（英語テキスト版）:**

```
A horizontal logo design layout. On the left: a cute round blob mascot creature wearing a tiny white lab coat and holding a magnifying glass. The creature is round, pudgy, and adorable in Sumikko Gurashi style with dot eyes and rosy cheeks. On the right: the text "Tokimeki Lab" written in a clean rounded sans-serif font in teal color (#2dd4bf). Below the main text, a smaller line reads "Self-Discovery Diagnostics" in light grey. The overall composition is balanced with breathing room between mascot and text. Flat kawaii illustration merged with clean modern typography. White/transparent background. Fresh, trustworthy, youthful aesthetic. Aspect ratio approximately 16:5.
```

**DALL-E推奨サイズ:** 1792x1024（横長モードで生成後、上下をクロップ）

**スタイル調整ヒント (DALL-E):**
- 日本語テキストは確実に文字化けするため、キャラのみ生成が安全
- 英語テキスト版もフォント品質にばらつきがある。あくまでレイアウト参考として活用
- テキスト部分はCanva、Figma、またはAdobe Illustratorで丸ゴシック系フォント（例: M PLUS Rounded 1c, 筑紫A丸ゴシック）を使用して手動配置が最も品質が高い

---

### Stable Diffusion / Flux プロンプト

**キャラクター部分のみ:**

**ポジティブプロンプト:**

```
(logo mascot character:1.4), (single cute round blob creature:1.3), clean white background, wearing tiny white lab coat, holding small magnifying glass, (Sumikko Gurashi style:1.2), kawaii, chibi, round pudgy body, dot eyes, rosy cheeks, subtle teal tint on body, soft cel-shaded illustration, clean outlines, flat colors, simple memorable silhouette, (masterpiece:1.2), (best quality:1.2), no text, professional logo quality, centered
```

**ネガティブプロンプト:**

```
text, watermark, signature, typography, letters, words, human, realistic, 3d render, photo, blurry, low quality, deformed, dark background, gradient background, complex background, frame, border, multiple characters, busy, cluttered
```

**推奨設定:**
- 解像度: 1024 x 1024（キャラ単体）
- CFGスケール: 7
- サンプラー: DPM++ 2M Karras（30ステップ）
- 生成後、背景除去ツール（rembg等）で透過PNG化

---

## 補足: 実用ワークフロー推奨手順

### キャラクターシート（22体）
1. **AI生成**: 6体ずつ4枚に分割して生成（精度重視）
2. **切り出し**: 各キャラクターを個別に切り出し（Photoshop / remove.bg）
3. **色調整**: 必要に応じてカラーを微調整
4. **統一化**: サイズ・余白を統一して最終アイコンセットに

### アプリアイコン
1. **AI生成**: 複数バリエーションを生成
2. **選定**: 最も可愛い・視認性の高いものを選択
3. **仕上げ**: 1024x1024にリサイズ、色味調整
4. **テスト**: 実際のアプリアイコンサイズ（60x60, 120x120等）で視認性確認

### ロゴ
1. **AI生成**: マスコットキャラクターのみ生成
2. **背景除去**: remove.bg / rembg で透過PNG化
3. **テキスト追加**: Figma / Canvaで「ときめきラボ」テキストを丸ゴシック(ティール色)で配置
4. **サブテキスト**: 「22の本格診断で自分を完全解析」を小さく下に配置
5. **書き出し**: 透過PNG、SVG（可能なら）で書き出し

---

## クイックリファレンス: プラットフォーム選択ガイド

| 用途 | 推奨プラットフォーム | 理由 |
|------|---------------------|------|
| キャラシート | Midjourney v6 | 複数キャラ配置の精度が最も高い |
| アプリアイコン | DALL-E 3 / Midjourney | 色指定・構図の安定性が高い |
| ロゴマスコット | Midjourney / Flux | シンプルなキャラデザインの品質が高い |
| 色の正確さ重視 | DALL-E 3 | HEXコード指定への反応が最も良い |
| 大量バリエーション | Stable Diffusion | ローカル実行で無制限生成可能 |
