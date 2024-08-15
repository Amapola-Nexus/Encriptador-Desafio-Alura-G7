const modal = document.querySelector("#modal");
const modalConfig = document.querySelector("#config-modal");
const openModal = document.querySelector("#question-button");
const openModalConfig= document.querySelector('#config-button');
const closeModal = document.querySelector("#closebutton");
const closeModalConfig = document.querySelector("#closebuttonConfig");
const form = document.querySelector('#configForm');

openModal.addEventListener('click', () => {
    modal.showModal();
});

closeModal.addEventListener('click', () => {
    modal.close();
});

openModalConfig.addEventListener('click', () => {
    modalConfig.showModal();
});

let aKey = document.getElementById("aKeyInput");
let eKey = document.getElementById("eKeyInput");
let iKey = document.getElementById("iKeyInput");
let oKey = document.getElementById("oKeyInput");
let uKey = document.getElementById("uKeyInput");

let aCounter = (document.getElementById('aCount'));
let eCounter = (document.getElementById('eCount'));
let iCounter = (document.getElementById('iCount'));
let oCounter = (document.getElementById('oCount'));
let uCounter = (document.getElementById('uCount'));

let inputWarning = document.getElementById("inputWarning");

function startCondition() {
    aCounter.innerHTML = aKey.defaultValue.length;
    eCounter.innerHTML = eKey.defaultValue.length;
    iCounter.innerHTML = iKey.defaultValue.length;
    oCounter.innerHTML = oKey.defaultValue.length;
    uCounter.innerHTML = uKey.defaultValue.length;
    inputWarning.style.display="none";
};

startCondition();

[aKey, eKey, iKey, oKey, uKey].forEach(function(elements) {
    elements.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-z ñ]/g, "");
    });
});

[aKey, eKey, iKey, oKey, uKey].forEach(function(counters){
    counters.addEventListener('input', function(){
        aCounter.innerHTML = aKey.value.length;
        eCounter.innerHTML = eKey.value.length;
        iCounter.innerHTML = iKey.value.length;
        oCounter.innerHTML = oKey.value.length;
        uCounter.innerHTML = uKey.value.length;
    });
});

document.querySelector("#restoreBtn").addEventListener('click', () => {
    startCondition();
});

// probablemente puedo usar un ForEach para no copiar y pegar xkey.Value a cada rato pero no sé como escribirlo en este caso jajaja

closeModalConfig.addEventListener('click', () => {
    if ((aKey.value == "") || (eKey.value == "") || (iKey.value == "") || (oKey.value == "") || (uKey.value == "")){
        inputWarning.style.display="block";
    } else {
        modalConfig.close();
    }
});

modalConfig.addEventListener('keydown', (ev) =>{
    if (ev.key === 'Escape') {
        if ((aKey.value == "") || (eKey.value == "") || (iKey.value == "") || (oKey.value == "") || (uKey.value == "")){
            ev.preventDefault();
            inputWarning.style.display="block";
        }
    }
});

function randomStringGen(stringLength) {
    let randomString = "";
    let vowels = ['a', 'e', 'i', 'o', 'u', 'ua', 'ue', 'uo', 'ia', 'ie', 'ai', 'ei', 'oi', 'au', 'eu', 'ou', 'iu', 'ui'];
    let consonants = ['b', 'c', 'ch', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'll', 'm', 'n', 'ñ', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

    let isCons = false;

    var arr;

    for (var i, i = 0; i < stringLength; i++) {
        if (isCons) arr = consonants
        else arr = vowels
        isCons = !isCons;

        randomString += arr[Math.round(Math.random()*(arr.length-1))];
    }

    if (randomString.length > 5){
        randomString = randomString.substring(0, 5)
    }
    return randomString;
}

function createRanNum() {
    return Math.floor(Math.random()*5)+2;
}

function randomBtn() {
    aKey.value = randomStringGen(createRanNum());
        aCounter.innerHTML = aKey.value.length;
    eKey.value = randomStringGen(createRanNum());
        eCounter.innerHTML = eKey.value.length;
    iKey.value = randomStringGen(createRanNum());
        iCounter.innerHTML = iKey.value.length;
    oKey.value = randomStringGen(createRanNum());
        oCounter.innerHTML = oKey.value.length;
    uKey.value = randomStringGen(createRanNum());
        uCounter.innerHTML = uKey.value.length;

    inputWarning.style.display="none";
};

//End of Modal Configuration


const userTextarea = document.getElementById("textarea__user");
const resultArea = document.getElementById("result__textarea");
const resultBefore = document.getElementById("resultBefore");
const resultAfter = document.getElementById("resultAfter");
const beforeMessage = document.getElementById('result-before--msg');

const userWarning = document.getElementById('warning-Text');

const btnEn = document.getElementById('btnEn');
const btnDe = document.getElementById('btnDe');

const noDecrypt = document.getElementById('noDecrypt');
const closeND = document.getElementById('closeND');
const NDMessage = document.getElementById('ND-Message');

let remainingCharText = document.getElementById("charCount");

userTextarea.addEventListener('input', function() {
    this.value = this.value.toLowerCase();
    this.value = this.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    this.value = this.value.replace(/[^A-Za-z \n ñ à-ü À-Ü]/g, "");
    
});

userTextarea.addEventListener('input', function(){
    remainingCharText.innerHTML = userTextarea.maxLength - userTextarea.value.length;
});

function eraseText() {
    userTextarea.value = "";
    remainingCharText.innerHTML = userTextarea.maxLength;
    btnEn.setAttribute('disabled','true');
    btnDe.setAttribute('disabled','true');
}

function eraseResult() {
    resultArea.value = "";
    document.querySelector('#copyBtn').setAttribute('disabled','true');
}

function disableBtn() {
    btnDe.setAttribute('disabled', 'true');
    btnEn.setAttribute('disabled', 'true');
}

userTextarea.addEventListener('input', function(){
    if (userTextarea.value !== "") {
        btnEn.removeAttribute('disabled');
        btnDe.removeAttribute('disabled');
    } else {
        disableBtn()
    }
});

function encrypt() {

    let keyTableEn = {
        'a': `${aKey.value}`,
        'e': `${eKey.value}`,
        'i': `${iKey.value}`,
        'o': `${oKey.value}`,
        'u': `${uKey.value}`,
    };

    let userValue = userTextarea.value;
    if (userValue != ""){
        let output = userValue.replace(/[eioua]/g, match => keyTableEn[match]);
        resultArea.value = output;
        document.querySelector('#copyBtn').removeAttribute('disabled');
            if (resultAfter.hasAttribute('style', 'display:none')){
                resultBefore.style.display = 'none';
                resultAfter.style.display = 'block';
            }
    }
    else {
        //do nothing
    }
}

function decrypt(){
    let newUserValue = userTextarea.value;
    let values = [`${aKey.value}`, `${eKey.value}`, `${iKey.value}`, `${oKey.value}`, `${uKey.value}`]
    
    if (values.some(key => newUserValue.includes(key))){
        let output = newUserValue.replaceAll(`${aKey.value}`, 'a').replaceAll(`${eKey.value}`, 'e').replaceAll(`${iKey.value}`, 'i').replaceAll(`${oKey.value}`, 'o').replaceAll(`${uKey.value}`, 'u');
        resultArea.value = output;

        document.querySelector('#copyBtn').removeAttribute('disabled');
            if (resultAfter.hasAttribute('style', 'display:none')){
                resultBefore.style.display = 'none';
                resultAfter.style.display = 'block';
        }
    }
    else {
        showNoDecrypt();
    }
}

function showNoDecrypt() {
    if (noDecrypt.classList.contains('not-show')) {
        
        noDecrypt.classList.remove('not-show');
        noDecrypt.classList.add('showND');

        noDecrypt.timeoutId = setTimeout(() => {
            noDecrypt.classList.remove('showND');
        }, 2700);

        noDecrypt.timeoutIdTwo = setTimeout(() => {
            noDecrypt.classList.add('not-show');
        }, 2700);

        closeND.addEventListener('click', () => {
            if (noDecrypt.classList.contains('showND')){
                noDecrypt.classList.remove('showND');
                noDecrypt.classList.add('not-show');
        
                if (noDecrypt.timeoutId) clearTimeout(noDecrypt.timeoutId);
                if (noDecrypt.timeoutIdTwo) clearTimeout(noDecrypt.timeoutIdTwo);
            }
        })
    }
}

function copyResult() {
    resultArea.select();
    resultArea.setSelectionRange(0, 9999);

    navigator.clipboard.writeText(resultArea.value);
}

const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");
const closeToast = document.getElementById("closeButtonToast");
const progressBar = document.getElementById("progressBar");
const toastMSG = document.getElementById('toast-msg');

copyBtn.addEventListener('click', () => {
    if ((!toast.classList.contains('active')) && (!progressBar.classList.contains('active'))){

        toast.classList.add('active');
        progressBar.classList.add('active');

        toast.timeoutId = setTimeout(() => {
            toast.classList.remove('active');
        }, 2700);

        progressBar.timeoutId = setTimeout(() => {
            progressBar.classList.remove('active');
        }, 3040);
    } else {
        //do nothing
    };
});

closeToast.addEventListener('click', () => {

    toast.classList.remove('active');

    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    if (progressBar.timeoutId) clearTimeout(progressBar.timeoutId);

    setTimeout(() => {
        progressBar.classList.remove('active');
    }, 340);
});


//LANGUAGE DATA

const langOpt = document.getElementById('languages');

const langData = {
    es: {
        modalTitle: "Este encriptador se ha hecho para el desafío de Alura Latam y es mi primer proyecto de html/css/js finalizado.",
        modalDescOne: "Puedes cambiar la llave de encriptación en la Configuración.",
        modalDescTwo: "El proceso de decriptación solo funcionará si el texto ingresado contiene la llave actualmente configurada.",
        textAreaPlaceholder : "Inserte texto aquí",
        tooltipText: "Limpiar",
        warning : "Solo se permiten minúsculas, sin tildes ni carácteres especiales",
        buttonEn : "Encriptar",
        buttonDe : "Desencriptar",
        noDecryptMsg: "Este texto no se puede desencriptar",

        resultBeforeText : "El texto encriptado/desencriptado aparecerá aquí",
        copyButton : "Copiar",
        copyToast: "Copiado",

        configTitle: "Configuración",
        configDesc: "Los cambios se aplican automáticamente.",
        configLangLabel: "Lenguaje",
        configParenth: "(Solo se aceptan letras minúsculas,\n sin tildes, carácteres especiales o espacios)",
        restoreButton: "Restablecer",
        keyGenButton: "Generar llave"
    },
    en: {
        modalTitle: "This encryptor has been made for the challenge issued by Alura Latam, and is my first project made with html/css/js.",
        modalDescOne: "You can change the encryption key in Settings.",
        modalDescTwo: "The decryption process will only work if the inserted text contains the currently set encryption key.",
        textAreaPlaceholder : "Insert text here",
        tooltipText: "Clear",
        warning : "Only lowercase letters allowed, without special characters",
        buttonEn : "Encrypt",
        buttonDe : "Decrypt",
        noDecryptMsg: "This text cannot be decrypted",

        resultBeforeText : "Encrypted/decrypted text will appear here",
        copyButton : "Copy",
        copyToast: "Copied",

        configTitle: "Settings",
        configDesc: "Changes will be applied automatically.",
        configLangLabel: "Language",
        configParenth: "(Only lowercase letters are allowed,\n with no special characters or spaces)",
        restoreButton: "Restore",
        keyGenButton: "Random key"
    }
}

langOpt.addEventListener('change', (e) => {
    setLanguage(e.target.value);
});

const setLanguage = (language) => {
    if (language == "en") {
        document.getElementById('modal__title').innerText = langData.en.modalTitle;
        document.getElementById('list_one').innerText = langData.en.modalDescOne;
        document.getElementById('list_two').innerText = langData.en.modalDescTwo;
        userTextarea.placeholder = langData.en.textAreaPlaceholder;
        document.getElementById('tooltip') = langData.en.tooltipText;
        userWarning.innerText = langData.en.warning;
        btnEn.innerText = langData.en.buttonEn;
        btnDe.innerText = langData.en.buttonDe;
        NDMessage.innerText = langData.en.noDecryptMsg;

        beforeMessage.innerText = langData.en.resultBeforeText;
        copyBtn.innerText = langData.en.copyButton;
        toastMSG.innerText = langData.en.copyToast;

        document.getElementById('config__title').innerText = langData.en.configTitle;
        document.getElementById('config__desc').innerText = langData.en.configDesc;
        document.getElementById('lang__label').innerText = langData.en.configLangLabel;
        document.getElementById('input__note').innerText = langData.en.configParenth;
        document.getElementById('restoreBtn').value = langData.en.restoreButton;
        document.getElementById('randBtn').value = langData.en.keyGenButton;

    } else if (language == "es") {
        document.getElementById('modal__title').innerText = langData.es.modalTitle;
        document.getElementById('list_one').innerText = langData.es.modalDescOne;
        document.getElementById('list_two').innerText = langData.es.modalDescTwo;
        userTextarea.placeholder = langData.es.textAreaPlaceholder;
        document.getElementById('tooltip') = langData.es.tooltipText;
        userWarning.innerText = langData.es.warning;
        btnEn.innerText = langData.es.buttonEn;
        btnDe.innerText = langData.es.buttonDe;
        NDMessage.innerText = langData.es.noDecryptMsg;

        beforeMessage.innerText = langData.es.resultBeforeText;
        copyBtn.innerText = langData.es.copyButton;
        toastMSG.innerText = langData.es.copyToast;

        document.getElementById('config__title').innerText = langData.es.configTitle;
        document.getElementById('config__desc').innerText = langData.es.configDesc;
        document.getElementById('lang__label').innerText = langData.es.configLangLabel;
        document.getElementById('input__note').innerText = langData.es.configParenth;
        document.getElementById('restoreBtn').value = langData.es.restoreButton;
        document.getElementById('randBtn').value = langData.es.keyGenButton;
    }
};
