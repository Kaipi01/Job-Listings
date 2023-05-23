import * as json from '../data.json' assert { type: 'json' }
import renderJobsList from './renderJobsList.js'

const data = getDataJSON(json) || []

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
    const categories = []

    checkedCategories.forEach(checkedCategory => {
        categories.push(checkedCategory.textContent)
    })

    renderJobsList(data.filter(job => filterFunc(job)))
    addActiveClassToBtns(categories)

    function filterFunc(job) {
        const flags = []
        flags.length = categories.length
        flags.fill(false)

        for (let i = 0; i < categories.length; i++) {
            if (
                job.tools.includes(categories[i]) || 
                job.role === categories[i] || 
                job.level === categories[i] ||
                job.languages.includes(categories[i])
            )  flags[i] = true
        }
        return flags.every(value => value === true)
    }
}

function selectCategory(e) {
    createRemoveCategoryBtn(e.target.textContent)
    filterCategories()
    setFiltersVisibilityTo('visible')
}

function createRemoveCategoryBtn(categoryName) {
    const sameFiltersCategory = document.querySelector(`#${categoryName}`)

    if (sameFiltersCategory) return

    const div = document.createElement('div')
    div.id = categoryName
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
    setFiltersVisibilityTo('hidden')
    renderJobsList(data)
}

function removeCategory(e) {
    e.target.parentNode.remove()
    filterCategories()

    if (activeFiltersContainer.innerHTML === '') {
        setFiltersVisibilityTo('hidden')
        renderJobsList(data)
    }
}

function setFiltersVisibilityTo(visibility) {
    const filtersContainer = document.querySelector('.filters')
    visibility === 'visible' 
        ? filtersContainer.classList.remove('filters--hide')
        : filtersContainer.classList.add('filters--hide')
}

function addActiveClassToBtns(categories = []) {
    categories.forEach(category => {
        const sameCategories = document.querySelectorAll(`button[data-category="${category}"]`)
        sameCategories.forEach(btn => btn.classList.add('job__categories-btn--active'))
    })
}

function getDataJSON(json) {
    const stringFromJSON = JSON.stringify(json)
    const data = JSON.parse(stringFromJSON)
    return data.default
}