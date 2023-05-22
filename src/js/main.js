import * as json from '../data.json' assert { type: 'json' }
import renderJobsList from './renderJobsList.js'

const data = getDataJSON(json) || []
const filtersContainer = document.querySelector('.filters')
const activeFiltersContainer = document.querySelector('.filters__active')
const clearCategoriesBtn = document.querySelector('.filters__clear')

console.log('Jobs Data: ', data)

renderJobsList(data)

clearCategoriesBtn.addEventListener('click', clearCategories)

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('job__categories-btn'))
        selectCategory(e)
    else if (e.target.classList.contains('filters__category-remove'))
        removeCategory(e)
})

function filterCategories() {
    const checkedCategories = document.querySelectorAll('.filters__category-name')
    const category = checkedCategories[0].textContent

    renderJobsList(data.filter(job => {
        if (
            job.tools.includes(category) || 
            job.role === category || 
            job.level === category ||
            job.languages.includes(category)
            )  return true
        else return false
    }))

}

function selectCategory(e) {
    createRemoveCategoryBtn(e.target.textContent)
    filterCategories()
    filtersContainer.classList.remove('filters--hide')
}

function createRemoveCategoryBtn(categoryName) {
    const div = document.createElement('div')
    div.className = 'filters__category'
    div.innerHTML = `
        <p class="filters__category-name">${categoryName}</p>
        <button class="filters__category-remove">
            <span class="visually-hide">Remove this filter</span>
            <img class="filters__category-remove-icon" src="./images/icon-remove.svg" alt="X" aria-hidden="true">
        </button>
    `
    activeFiltersContainer.append(div)
}

function clearCategories() {
    activeFiltersContainer.innerHTML = ''
    filtersContainer.classList.add('filters--hide')
    renderJobsList(data)
}

function removeCategory(e) {
    e.target.parentNode.remove()

    if (activeFiltersContainer.innerHTML === '') {
        filtersContainer.classList.add('filters--hide')
        renderJobsList(data)
    }
}

function getDataJSON(json) {
    const stringFromJSON = JSON.stringify(json)
    const data = JSON.parse(stringFromJSON)
    return data.default
}

