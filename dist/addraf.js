function addraf(formSelector) {
  const theForm = document.querySelector(formSelector)
  const fetchButton = theForm.querySelector('[getAddress]')
  const postcodeInput = theForm.querySelector('[postcode]')
  const prefectureInput = theForm.querySelectorAll('[prefecture]')
  const cityInput = theForm.querySelectorAll('[city]')
  const addressInput = theForm.querySelectorAll('[address1]')
  const prefectureKanaInput = theForm.querySelectorAll('[prefectureKana]')
  const cityKanaInput = theForm.querySelectorAll('[cityKana]')
  const addressKanaInput = theForm.querySelectorAll('[address1Kana]')
  const allInputs = [
    prefectureInput,
    cityInput,
    addressInput,
    prefectureKanaInput,
    cityKanaInput,
    addressKanaInput
  ]
  const init = () => {
    if (!fetchButton) {
      postcodeInput.addEventListener('input', (e) => {
        const input = e.target
        fetchAddress(input.value)
      })
    }
    else {
      fetchButton.addEventListener('click', (e) => {
        e.preventDefault()
        fetchAddress(postcodeInput.value)
      })
    }
    const fetchAddress = (pc) => {
      const postcode = pc.replace(/\D/g, '')
      if (postcode.length !== 7)
        return false
      getPostcodeData(postcode).then((data) => {
        if (data.status == 200) {
          const results = data.results[0]
          allInputs.forEach((inputList) => inputList.forEach((input) => {
            const inputElement = input
            inputElement.value = ''
          }))
          prefectureInput.forEach((input) => {
            const inputElement = input
            inputElement.value += results.address1
          })
          cityInput.forEach((input) => {
            const inputElement = input
            inputElement.value += results.address2
          })
          addressInput.forEach((input) => {
            const inputElement = input
            inputElement.value += results.address3
          })
          prefectureKanaInput.forEach((input) => {
            const inputElement = input
            inputElement.value += fullWidth(results.kana1)
          })
          cityKanaInput.forEach((input) => {
            const inputElement = input
            inputElement.value += fullWidth(results.kana2)
          })
          addressKanaInput.forEach((input) => {
            const inputElement = input
            inputElement.value += fullWidth(results.kana3)
          })
        }
      })
    }
    const getPostcodeData = async (postcode) => {
      const response = await fetch('https://zipcloud.ibsnet.co.jp/api/search?' +
                new URLSearchParams({ zipcode: postcode }), {
        method: 'get'
      })
      return response.json()
    }
    const fullWidth = (str) => {
      return str.normalize('NFKC')
    }
  }
  init()
}
