const PROMPT_DATA = {
    // --- 画質・スタイル ---
    artStyles: [
        { val: "photorealistic, raw photo", label: "実写・フォトリアル" },
        { val: "anime style, cel shaded", label: "アニメ塗り" },
        { val: "2.5D, semi-realistic", label: "2.5D (フィギュア風)" },
        { val: "oil painting", label: "油絵風" }
    ],
    qualities: [
        { val: "masterpiece, best quality, ultra high res", label: "最高画質 (標準)" },
        { val: "film grain, chromatic aberration, analogue film style", label: "フィルム風 (レトロ)" }
    ],
    angles: [
        { val: "", label: "指定なし" },
        { val: "face focus, close-up, portrait", label: "顔アップ" },
        { val: "upper body shot", label: "上半身" },
        { val: "cowboy shot, thigh up", label: "膝上" },
        { val: "full body shot, wide view, shows entire body, shoes visible", label: "全身" },
        { val: "extreme long shot, far away, wide angle lens, small subject", label: "遠景" },
        { val: "from above, high angle", label: "俯瞰 (上から)" },
        { val: "from below, low angle", label: "あおり (下から)" }
    ],
    lighting: [
        { val: "", label: "指定なし" },
        { val: "natural lighting", label: "自然光" },
        { val: "cinematic lighting", label: "映画風ライティング" },
        { val: "backlighting", label: "逆光" },
        { val: "soft lighting", label: "柔らかい光" },
        { val: "stage lighting, spotlight", label: "ステージ照明" }
    ],

    // --- 人物詳細 ---
    charBases: [
        { val: "", label: "-- 自由入力のみ --" },
        { val: "1girl, young woman, asian, japanese", label: "日本人女性 (若め)" },
        { val: "1girl, woman, mature female, asian, japanese", label: "日本人女性 (大人)" },
        { val: "1girl, young woman, k-pop idol, korean", label: "韓国アイドル風" },
        { val: "1girl, young woman, caucasian", label: "欧米人女性" }
    ],
    charHair: [
        { val: "", label: "-- 指定なし --" },
        { val: "black hair, long straight hair", label: "黒髪ロング" },
        { val: "brown hair, bob cut", label: "茶髪ボブ" },
        { val: "platinum blonde hair, wavy hair", label: "金髪ウェーブ" },
        { val: "short black hair, messy hair", label: "黒髪ショート" },
        { val: "black hair, ponytail", label: "ポニーテール" },
        { val: "twintails", label: "ツインテール" },
        { val: "long twintails, high tied", label: "高めツインテール" },
        { val: "side ponytail", label: "サイドポニー" }
    ],
    
    // 顔パーツ
    faceEyes: [
        { val: "", label: "-- 目 (指定なし) --" },
        { val: "round eyes", label: "丸目" },
        { val: "tareme", label: "タレ目" },
        { val: "tsurime", label: "ツリ目" },
        { val: "sharp eyes", label: "切れ長" },
        { val: "closed eyes", label: "閉じ目" },
        { val: "wink", label: "ウィンク" }
    ],
    faceMouth: [
        { val: "", label: "-- 口 (指定なし) --" },
        { val: "smile", label: "笑顔" },
        { val: "open mouth", label: "口開け" },
        { val: "pout", label: "むっとする" },
        { val: "lips", label: "唇強調" },
        { val: "clenched teeth", label: "歯噛み" }
    ],
    faceShape: [
        { val: "", label: "-- 輪郭 (指定なし) --" },
        { val: "round face", label: "丸顔" },
        { val: "oval face", label: "面長・卵型" },
        { val: "sharp jawline", label: "シャープな顎" },
        { val: "chubby face", label: "ぽっちゃり" }
    ],
    faceSkin: [
        { val: "", label: "-- 特徴 (指定なし) --" },
        { val: "pale skin", label: "色白" },
        { val: "tanned skin", label: "日焼け" },
        { val: "mole under eye", label: "泣きぼくろ" },
        { val: "blush", label: "赤面" }
    ],

    // プリセット
    facePresets: {
        "idol": { eye: "round eyes", mouth: "smile", shape: "round face", skin: "blush" },
        "cool": { eye: "sharp eyes", mouth: "lips", shape: "sharp jawline", skin: "pale skin" },
        "model": { eye: "sharp eyes", mouth: "open mouth", shape: "oval face", skin: "" },
        "jirai": { eye: "tareme", mouth: "pout", shape: "round face", skin: "pale skin" }
    },
    facePresetList: [
        { val: "", label: "-- カスタム (手動) --" },
        { val: "idol", label: "セット: 王道アイドル" },
        { val: "cool", label: "セット: クールビューティー" },
        { val: "model", label: "セット: モデル風" },
        { val: "jirai", label: "セット: 地雷系" }
    ],

    charBody: [
        { val: "", label: "-- 指定なし --" },
        { val: "average body", label: "標準" },
        { val: "slim body, slender", label: "スリム" },
        { val: "curvy body, hourglass figure", label: "グラマー" },
        { val: "plump body", label: "ぽっちゃり" },
        { val: "fit body, athletic, toned", label: "筋肉質" }
    ],
    charBust: [
        { val: "", label: "-- 指定なし --" },
        { val: "flat chest", label: "小さめ" },
        { val: "medium breasts", label: "普通" },
        { val: "large breasts", label: "大きめ" }
    ],

    // --- 衣装詳細 ---
    outfits: [
        { val: "", label: "-- 自由入力のみ --" },
        // 新規追加
        { val: "black V-neck vest jumper skirt, white short-sleeved collared shirt underneath, black necktie, school emblem patch on chest, gold buttons at high waist, black pleated skirt, knee-length, black jacket draped over shoulder, carrying a long black sheathed item", label: "カレッジジャケット＆サススカート" },
        // その他安全版リスト
        { val: "dark grey ribbed knit sleeveless top, high neck, form-fitting, light blue ripped denim jeans, black leather belt, silver buckle, blue and white plaid shirt tied around waist", label: "デニム＆ニット (カジュアル)" },
        { val: "black ribbed knit top, short flutter sleeves, ruffled chest detail, strappy neckline, white and black plaid mini skirt, tweed fabric, high waist, Japanese girly fashion", label: "量産型・地雷系ファッション" },
        { val: "cute loungewear set, light pink camisole top, heart pattern, white fluffy zip-up hoodie, sherpa fleece", label: "もこもこルームウェア" },
        { val: "blue and black plaid dress, long sleeves, black collar, belted waist, A-line skirt, knee length", label: "青チェックのワンピース" },
        { val: "white blouse, long sleeves, red plaid necktie, red pinafore dress, jumper skirt, tartan pattern, square neckline, long skirt, white eyelet lace hem", label: "赤チェックのジャンスカ" },
        { val: "apricot beige coat, wool blend fabric, A-line silhouette, swing coat, oversized collar, mid-thigh length", label: "ベージュのコート (冬服)" },
        { val: "white wedding dress, strapless dress, satin fabric, A-line silhouette, tiered skirt back, cascading ruffles, long train", label: "ウェディングドレス" },
        { val: "sailor dress, one-piece dress, school uniform style, off-white color, navy blue trim, navy neckerchief, pleated skirt", label: "セーラーワンピース (清楚)" },
        { val: "school uniform, white shirt, navy pleated skirt, red ribbon, loafers", label: "学生服 (セーラー)" },
        { val: "office lady uniform, white blouse, tight skirt, natural skin", label: "OLスーツ" }
    ],
    outfitFit: [
        { val: "", label: "自然" },
        { val: "fitted", label: "フィット" },
        { val: "loose fit", label: "ゆったり" },
        { val: "layered", label: "重ね着" }
    ],

    // --- ポーズ・向き ---
    basePoses: [
        { val: "standing", label: "立ち" },
        { val: "sitting", label: "座り" },
        { val: "lying on back", label: "仰向け" },
        { val: "lying on stomach", label: "うつ伏せ" },
        { val: "kneeling", label: "膝立ち" },
        { val: "squatting", label: "しゃがみ" }
    ],
    facing: [
        { val: "", label: "自然" },
        { val: "facing viewer, looking at viewer", label: "正面" },
        { val: "from side, profile, side view", label: "真横 (横顔)" },
        { val: "turning slightly, 3/4 view", label: "斜め" },
        { val: "from behind, back view", label: "後ろ姿" },
        { val: "from behind, looking back, looking at viewer", label: "見返り" }
    ],
    legs: [
        { val: "", label: "指定なし" },
        { val: "legs together", label: "閉じる" },
        { val: "crossed legs", label: "組む" },
        { val: "legs apart", label: "開く" },
        { val: "knees to chest", label: "体育座り" }
    ],
    oneHandPoses: [
        { val: "", label: "自然に" },
        { val: "peace sign", label: "ピース" },
        { val: "upside-down peace sign", label: "ギャルピ" },
        { val: "hand on hip", label: "腰に手" },
        { val: "hand on cheek", label: "頬杖" },
        { val: "touching hair", label: "髪を触る" },
        { val: "waving hand", label: "手を振る" }
    ],

    // --- 背景 ---
    locations: [
        { val: "", label: "指定なし" },
        { val: "indoors, messy bedroom, cluttered, lifestyle", label: "自室 (生活感)" },
        { val: "indoors, otaku room, anime posters, figures, shelves", label: "オタク部屋" },
        { val: "indoors, modern office, desk, computer", label: "オフィス" },
        { val: "indoors, luxury brand store, elegant atmosphere", label: "高級ブランド店内" },
        { val: "outdoors, grassland, meadow, blue sky", label: "草原" },
        { val: "outdoors, riverbank, river, grass", label: "河原" },
        { val: "outdoors, mountain, nature, forest", label: "山中" },
        { val: "simple white background", label: "白背景" },
        { val: "simple black background", label: "黒背景" },
        { val: "park with trees", label: "公園" },
        { val: "busy city street", label: "街角" },
        { val: "luxury hotel room", label: "高級ホテル" },
        { val: "school classroom", label: "教室" },
        { val: "live stage", label: "ステージ" },
        { val: "beach with blue sky", label: "ビーチ" },
        { val: "japanese tatami room", label: "和室" }
    ],
    objects: [
        { val: "", label: "なし" },
        { val: "sofa", label: "ソファ" },
        { val: "bed", label: "ベッド" },
        { val: "chair", label: "椅子" },
        { val: "floor", label: "床" }
    ]
};