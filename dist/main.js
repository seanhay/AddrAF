function getAddr(formSelector) {
    const theForm = document.querySelector(formSelector);
    const postcodeInput = theForm.querySelector('[postcode]');
    const prefectureInput = theForm.querySelectorAll('[prefecture]');
    const cityInput = theForm.querySelectorAll('[city]');
    const addressInput = theForm.querySelectorAll('[address1]');
    const prefectureKanaInput = theForm.querySelectorAll('[prefectureKana]');
    const cityKanaInput = theForm.querySelectorAll('[cityKana]');
    const addressKanaInput = theForm.querySelectorAll('[address1Kana]');
    const allInputs = [
        prefectureInput,
        cityInput,
        addressInput,
        prefectureKanaInput,
        cityKanaInput,
        addressKanaInput
    ];
    const init = () => {
        postcodeInput.addEventListener('input', (e) => {
            // Strip all non-numeric chars from string
            const element = e.target;
            const val = element.value.replace(/\D/g, '');
            // Don't lookup if length too short
            if (val.length < 7)
                return false;
            getPostcodeData(val).then((data) => {
                console.log(data);
                if (data.status == 200) {
                    const results = data.results[0];
                    // All together
                    allInputs.forEach((inputList) => inputList.forEach((input) => {
                        const inputElement = input;
                        inputElement.value = '';
                    }));
                    // Kanji
                    prefectureInput.forEach((input) => {
                        const inputElement = input;
                        inputElement.value += results.address1;
                    });
                    cityInput.forEach((input) => {
                        const inputElement = input;
                        inputElement.value += results.address2;
                    });
                    addressInput.forEach((input) => {
                        const inputElement = input;
                        inputElement.value += results.address3;
                    });
                    // Kana
                    prefectureKanaInput.forEach((input) => {
                        const inputElement = input;
                        inputElement.value += fullWidth(results.kana1);
                    });
                    cityKanaInput.forEach((input) => {
                        const inputElement = input;
                        inputElement.value += fullWidth(results.kana2);
                    });
                    addressKanaInput.forEach((input) => {
                        const inputElement = input;
                        inputElement.value += fullWidth(results.kana3);
                    });
                }
            });
        });
        // Lookup data from zipcloud API
        const getPostcodeData = async (postcode) => {
            const response = await fetch('https://zipcloud.ibsnet.co.jp/api/search?' +
                new URLSearchParams({ zipcode: postcode }), {
                method: 'get'
            });
            return response.json();
        };
        // Convert halfwidth kana to fullwidth kana
        const fullWidth = (str) => {
            return str.normalize('NFKC');
        };
    };
    init();
}
export {};
