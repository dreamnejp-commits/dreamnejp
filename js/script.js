document.addEventListener('DOMContentLoaded', () => {

    // --- 初期化：リストの生成 ---
    function populateSelect(id, list) {
        const select = document.getElementById(id);
        if(!select) return; 
        select.innerHTML = "";
        list.forEach(item => {
            const option = document.createElement('option');
            option.value = item.val;
            option.textContent = item.label;
            select.appendChild(option);
        });
    }

    // データの流し込み
    populateSelect('artStyle', PROMPT_DATA.artStyles);
    populateSelect('quality', PROMPT_DATA.qualities);
    populateSelect('camera', PROMPT_DATA.angles);
    populateSelect('lighting', PROMPT_DATA.lighting);
    
    populateSelect('basePose', PROMPT_DATA.basePoses);
    populateSelect('facing', PROMPT_DATA.facing);
    populateSelect('legPose', PROMPT_DATA.legs);
    populateSelect('rightHand', PROMPT_DATA.oneHandPoses);
    populateSelect('leftHand', PROMPT_DATA.oneHandPoses);

    populateSelect('charBase', PROMPT_DATA.charBases);
    populateSelect('charHair', PROMPT_DATA.charHair);
    populateSelect('charBody', PROMPT_DATA.charBody);
    populateSelect('charBust', PROMPT_DATA.charBust);
    
    populateSelect('facePresetSelect', PROMPT_DATA.facePresetList);
    populateSelect('faceEye', PROMPT_DATA.faceEyes);
    populateSelect('faceMouth', PROMPT_DATA.faceMouth);
    populateSelect('faceShape', PROMPT_DATA.faceShape);
    populateSelect('faceSkin', PROMPT_DATA.faceSkin);

    populateSelect('outfitSelect', PROMPT_DATA.outfits);
    populateSelect('outfitFit', PROMPT_DATA.outfitFit);

    populateSelect('location', PROMPT_DATA.locations);
    populateSelect('objType', PROMPT_DATA.objects);

    // --- タブ切り替え ---
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // --- プリセット連動 ---
    const presetSelect = document.getElementById('facePresetSelect');
    presetSelect.addEventListener('change', (e) => {
        const key = e.target.value;
        const preset = PROMPT_DATA.facePresets[key];
        if (preset) {
            document.getElementById('faceEye').value = preset.eye;
            document.getElementById('faceMouth').value = preset.mouth;
            document.getElementById('faceShape').value = preset.shape;
            document.getElementById('faceSkin').value = preset.skin;
            generatePrompt();
        }
    });

    // --- プロンプト生成 ---
    const inputs = document.querySelectorAll('select, input, textarea');
    inputs.forEach(input => input.addEventListener('input', generatePrompt));

    document.querySelectorAll('input[name="aiMode"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const negSection = document.getElementById('negativeSection');
            if(e.target.value === 'gemini') negSection.classList.add('hidden');
            else negSection.classList.remove('hidden');
            generatePrompt();
        });
    });

    function generatePrompt() {
        const mode = document.querySelector('input[name="aiMode"]:checked').value;

        // 値の取得
        const cBase = document.getElementById('charBase').value;
        const cHair = document.getElementById('charHair').value;
        const cBody = document.getElementById('charBody').value;
        const cBust = document.getElementById('charBust').value;
        const cDesc = document.getElementById('charDesc').value.trim();
        
        // 顔
        const fEye = document.getElementById('faceEye').value;
        const fMouth = document.getElementById('faceMouth').value;
        const fShape = document.getElementById('faceShape').value;
        const fSkin = document.getElementById('faceSkin').value;
        const cFace = [fEye, fMouth, fShape, fSkin].filter(Boolean).join(", ");

        // 衣装
        const oSelect = document.getElementById('outfitSelect').value;
        const oFit = document.getElementById('outfitFit').value;
        const oDesc = document.getElementById('outfitDesc').value.trim();

        // 基本
        const style = document.getElementById('artStyle').value;
        const quality = document.getElementById('quality').value;
        const angle = document.getElementById('camera').value;
        const light = document.getElementById('lighting').value;
        
        // ポーズ・場所
        const base = document.getElementById('basePose').value;
        const facing = document.getElementById('facing').value;
        const legs = document.getElementById('legPose').value;
        const rHand = document.getElementById('rightHand').value;
        const lHand = document.getElementById('leftHand').value;
        
        const loc = document.getElementById('location').value;
        const obj = document.getElementById('objType').value;
        const objDet = document.getElementById('objDetail').value.trim();
        const bg = document.getElementById('bgDesc').value.trim();
        const neg = document.getElementById('negDesc').value.trim();

        let final = "";

        // ============================
        //  Local AI Mode (Tags)
        // ============================
        if (mode === 'local') {
            let parts = [];
            parts.push(quality, style);
            
            // 人物
            let charParts = [cBase, cHair, cFace, cBody, cBust, cDesc];
            parts.push(charParts.filter(Boolean).join(", "));
            
            // 衣装
            let outfitParts = [oFit, oSelect, oDesc].filter(Boolean);
            if(outfitParts.length > 0) parts.push(outfitParts.join(", "));

            // ポーズ・向き・場所・家具
            let poseString = base;
            if(obj) {
                let prep = (obj === "sofa" || obj === "bed" || obj === "chair") ? "on" : "in";
                if(base === "standing") prep = "near";
                let objFull = objDet ? `${objDet} ${obj}` : obj;
                poseString = `${base} ${prep} ${objFull}`;
            }
            parts.push(poseString);
            
            if(facing) parts.push(facing);
            if(legs) parts.push(legs);
            if(rHand) parts.push(`right hand ${rHand}`);
            if(lHand) parts.push(`left hand ${lHand}`);

            // 背景
            if(loc) parts.push(loc);
            if(bg) parts.push(bg);
            if(angle) parts.push(angle);
            if(light) parts.push(light);

            let posPrompt = parts.filter(Boolean).join(", ");
            let negPrompt = "(worst quality, low quality:1.4)";
            if(neg) negPrompt += `, ${neg}`;

            final = `[POSITIVE]\n${posPrompt}\n\n[NEGATIVE]\n${negPrompt}`;
        }
        // ============================
        //  Gemini Mode (Natural)
        // ============================
        else {
            let sentences = [];
            
            let shotType = "A photo of";
            if (angle) shotType = `A ${angle} of`; 

            // 人物
            let charDefParts = [cBase, cHair, cFace, cBody, cBust, cDesc];
            let charDef = charDefParts.filter(Boolean).join(", ");
            if(!charDef) charDef = "a character";

            // 文構築
            let mainSentence = `${shotType} ${charDef}`;
            if(facing) mainSentence += `, ${facing}`;

            // アクション + 家具 + 場所
            let actionPhrase = `is ${base}`;
            if(obj) {
                let prep = "on";
                if(base === "standing") prep = "standing near";
                else if(base === "sitting") prep = "sitting on";
                else if(base.includes("lying")) prep = "lying on";
                let objFull = objDet ? `a ${objDet} ${obj}` : `a ${obj}`;
                actionPhrase = `${prep} ${objFull}`;
            }
            
            if(loc) {
                actionPhrase += ` in a ${loc}`;
            }

            mainSentence += ` ${actionPhrase}.`;
            sentences.push(mainSentence);

            // 衣装
            let outfitParts = [oFit, oSelect, oDesc].filter(Boolean);
            if(outfitParts.length > 0) {
                sentences.push(`The character is wearing ${outfitParts.join(", ")}.`);
            }
            
            // 手足
            let bodyDetails = [];
            if(legs) bodyDetails.push(`legs are ${legs}`);
            if(rHand && lHand) {
                bodyDetails.push(`her right hand is making a ${rHand}, while her left hand is making a ${lHand}`);
            } else {
                if(rHand) bodyDetails.push(`her right hand is making a ${rHand}`);
                if(lHand) bodyDetails.push(`her left hand is making a ${lHand}`);
            }
            if(bodyDetails.length > 0) {
                let detailStr = bodyDetails.join(" and ");
                sentences.push(`Her ${detailStr}.`);
            }

            if(bg) sentences.push(`The background is ${bg}.`);

            let techSpecs = [style, quality]; 
            if(light) techSpecs.push(light);
            sentences.push(`Image details: ${techSpecs.join(", ")}.`);

            final = sentences.join(" ");
        }
        document.getElementById('finalPrompt').value = final;
    }

    document.getElementById('copyBtn').addEventListener('click', () => {
        const txt = document.getElementById('finalPrompt');
        txt.select();
        document.execCommand('copy');
        const btn = document.getElementById('copyBtn');
        const original = btn.innerText;
        btn.innerText = "COPIED!";
        setTimeout(() => btn.innerText = original, 1000);
    });
    
    generatePrompt();
});