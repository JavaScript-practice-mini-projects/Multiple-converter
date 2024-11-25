
window.onload = () => {
    main()
}

// Globals

const converter = {
    area: {
        name: 'Area',
        units: {
            squareKm: 'Square Kilometer',
            squareM: 'Square Meter',
            squareMile: 'Square Mile',
            squareYard: 'Square Yard',
            squareFoot: 'Square Foot'
        },
        variants: {
            'squareKm:squareM': {
                formula: 'multiply the area value by 1e+6',
                calculation(n){
                    return n*1000000;
                }
            },
            'squareKm:squareMile': {
                formula: 'divide the area value by 2.59',
                calculation(n){
                    return n / 2.59;
                }
            },
            'squareKm:squareYard': {
                formula: 'multiply the area value by 1.196e+6',
                calculation(n){
                    return n * 1196000;
                }
            },
            'squareKm:squareFoot': {
                formula: 'multiply the area value by 1.076e+7',
                calculation(n){
                    return n * 10760000;
                }
            },
            'squareM:squareKm': {
                formula: 'divide the area value by 1e+6',
                calculation(n){
                    return n / new Number('1e+6')
                }
            },
            'squareM:squareMile': {
                formula: 'divide the area value by 2.59e+6',
                calculation(n){
                    return n / new Number('2.59e+6')
                }
            },
            'squareM:squareYard': {
                formula: 'multiply the area value by 1.196',
                calculation(n){
                    return n * 1.196
                }
            },
            'squareM:squareFoot': {
                formula: 'multiply the area value by 10.764',
                calculation(n){
                    return n * 10.764
                }
            },
            'squareMile:squareKm': {
                formula: 'multiply the area value by 2.59',
                calculation(n){
                    return n * 2.59
                }
            },
            'squareMile:squareM': {
                formula: 'multiply the area value by 2.59e+6',
                calculation(n){
                    return n * new Number('2.59e+6')
                }
            },
            'squareMile:squareYard': {
                formula: 'for an approximate result, multiply the area value by 3.098e+6',
                calculation(n){
                    return n * new Number('3.098e+6')
                }
            },
            'squareMile:squareFoot': {
                formula: 'for an approximate result, multiply the area value by 2.788e+7',
                calculation(n){
                    return n * new Number('2.788e+7')
                }
            },
            'squareYard:squareKm': {
                formula: 'divide the area value by 1.196e+6',
                calculation(n){
                    return n / new Number('1.196e+6')
                }
            },
            'squareYard:squareM': {
                formula: 'divide the area value by 1.196',
                calculation(n){
                    return n /1.196
                }
            },
            'squareYard:squareMile': {
                formula: 'for an approximate result, divide the area value by 3.098e+6',
                calculation(n){
                    return n / new Number('3.098e+6')
                }
            },
            'squareYard:squareFoot': {
                formula: 'multiply the area value by 9',
                calculation(n){
                    return n * 9
                }
            },
            'squareFoot:squareKm': {
                formula: 'for an approximate result, divide the area value by 1.076e+7',
                calculation(n){
                    return n / new Number('1.076e+7')
                }
            },
            'squareFoot:squareM': {
                formula: 'divide the area value by 10.764',
                calculation(n){
                    return n / 10.764
                }
            },
            'squareFoot:squareMile': {
                formula: 'for an approximate result, divide the area value by 2.788e+7',
                calculation(n){
                    return n / new Number('2.788e+7')
                }
            },
            'squareFoot:squareYard': {
                formula: 'divide the area value by 9',
                calculation(n){
                    return n / 9
                }
            },
        }
    },
    mass: {
        name: 'Mass',
        units: {
            tonne: 'Tonne',
            kilogram: 'Kilogram',
            gram: 'Gram',
            milligram: 'Milligram'
        }
    },
    length: {
        name: 'length',
        units: {
            kilometer: 'Kilometer',
            meter: 'Meter',
            centimeter: 'Centimeter',
            millimeter: 'Millimeter'
        }
    },
    time: {
        name: 'Time',
        units: {
            second: 'Second',
            minute: 'Minute',
            hour: 'Hour',
            day: 'Day'
        }
    }
}

let leftCategoryLastValue = ''
let rightCategoryLastValue = ''

function main(){
    const selectCategory = document.getElementById('select-category')
    const leftCategory = document.getElementById('left-category')
    const rightCategory = document.getElementById('right-category')
    const leftInput = document.getElementById('left-input')
    const rightInput = document.getElementById('right-input')



    const converterKeys  = Object.keys(converter)
    removeAllChild(selectCategory);
    converterKeys.forEach((item) => {
        addOption(selectCategory, {value: item, text: converter[item].name})
    
    });
    
    // set default category units
    updateCategoryValue(selectCategory, leftCategory, rightCategory)

    
    selectCategory.addEventListener('change', function(){
        updateCategoryValue(selectCategory, leftCategory, rightCategory)

    })

    leftInput.addEventListener('keyup', function(event){
        if(event.target.value && !isNaN(event.target.value)){
            const selectCategoryValue = selectCategory.value
            const variants = converter[selectCategoryValue].variants
            const variantsKeys = `${leftCategory.value}:${rightCategory.value}`
            const variant = variants[variantsKeys]

            leftInput.value = Number(event.target.value)
            rightInput.value = variant.calculation(Number(event.target.value))
        }else{
            rightInput.value = '';
        }
        
    })
    rightInput.addEventListener('keyup', function(event){
        if(event.target.value && !isNaN(event.target.value)){
            const selectCategoryValue = selectCategory.value
            const variants = converter[selectCategoryValue].variants
            const variantsKeys = `${leftCategory.value}:${rightCategory.value}`
            const variant = variants[variantsKeys]

            rightInput.value = Number(event.target.value)
            leftInput.value = variant.calculation(Number(event.target.value))
        }else{
            leftInput.value = '';
        }
    })

  leftCategory.addEventListener('change', function(event){
    if(event.target.value === rightCategory.value){
        const options = rightCategory.getElementsByTagName('option')
        for(let i = 0; i < options.length; i++){
            if(leftCategoryLastValue === options[i].value){
                options[i].selected = true
                rightCategoryLastValue = options[i].value
                break
            }

        }
    }
    leftCategoryLastValue = event.target.value;
    calculationValue(selectCategory,leftCategory,rightCategory)
  })
 
  rightCategory.addEventListener('change', function(event){
    if(event.target.value === leftCategory.value){
        const options = leftCategory.getElementsByTagName('option')
        for(let i = 0; i < options.length; i++){
            if(rightCategoryLastValue === options[i].value){
                options[i].selected = true
                leftCategoryLastValue = options[i].value
                break
            }

        }
    }
    rightCategoryLastValue = event.target.value;
    calculationValue(selectCategory,leftCategory,rightCategory)
  })
 

    
   
}

// event handler

// DOM function

function addOption(parent, option){  // option = {value: item, text: units[item]}
        
    const opt = document.createElement('option')
    opt.setAttribute('value', option.value)
    opt.innerText = option.text
    parent.appendChild(opt)
    // console.log(option.value, option.text)
}

function removeAllChild(parent){
    while(parent.firstChild){
        parent.firstChild.remove()
    }
}


function updateCategoryValue(selectCategory, leftCategory, rightCategory){
    const selectCategoryValue = selectCategory.value
    const units = converter[selectCategoryValue].units

        // handle left site 
    removeAllChild(leftCategory)
    const option = Object.keys(units)
    option.forEach((item) => {
        addOption(leftCategory, {value: item, text: units[item]})
    })
    leftCategoryLastValue = leftCategory.value

    // handle right site
    removeAllChild(rightCategory)
    option.forEach((item) => {
        addOption(rightCategory, {value: item, text: units[item]})
    })

    // change default option of right select
    rightCategory.getElementsByTagName('option')[1].selected = true;
    rightCategoryLastValue = leftCategory.value

    calculationValue(selectCategory,leftCategory,rightCategory)
}

function calculationValue(selectCategory,leftCategory,rightCategory){
    const leftInput = document.getElementById('left-input')
    const rightInput = document.getElementById('right-input')
    const formulaShow = document.getElementById('formula-show')

    const selectCategoryValue = selectCategory.value
    const variants = converter[selectCategoryValue].variants
    const variantsKeys = `${leftCategory.value}:${rightCategory.value}`
    const variant = variants[variantsKeys]
    formulaShow.innerText = variant.formula
    leftInput.value = 1
    rightInput.value = variant.calculation(1)
}
   