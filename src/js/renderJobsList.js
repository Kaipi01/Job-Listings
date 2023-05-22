export default function renderJobsList(data = []) {
    const jobsContainer = document.querySelector('.content__jobs')
    jobsContainer.innerHTML = ''

    data.forEach(job => {
        const article = document.createElement('article')
        const { company, contract, featured, id, languages, level, location, logo, position, postedAt, role, tools } = job
        const isNew = job.new  
        const template = `
            <div class="job__content">
                <img class="job__logo" src="${logo}" alt="${company} logo">
                <div class="job__info">

                    <div class="job__header">
                        <a class="job__company-name" href="#${company}">${company}</a>
                        ${ isNew ? '<span class="job__tag">NEW!</span>' : '' }
                        ${ featured ? '<span class="job__tag job__tag--dark">FEATURED</span>' : '' }
                    </div>

                    <h2 class="job__position">
                        <a class="job__position-link" href="#${position}">${position}</a>
                    </h2>

                    <ul class="job__info-list">
                        <li class="job__info-list-item">${postedAt}</li>
                        <li class="job__info-list-item">${contract}</li>
                        <li class="job__info-list-item">${location}</li>
                    </ul>
                </div> 
            </div>

            <div class="job__categories">
                <button data-category="${role}" class="job__categories-btn">${role}</button>
                <button data-category="${level}" class="job__categories-btn">${level}</button>
            </div>
        `
        article.id = `job${id}`
        article.className = 'job'
        article.innerHTML = template
        jobsContainer.append(article)

        const jobCategoriesEl = document.querySelector(`#job${id} .job__categories`)

        appendCategoryBtns(jobCategoriesEl, languages)
        appendCategoryBtns(jobCategoriesEl, tools)

        function appendCategoryBtns(context, categoryArray) {
            categoryArray.forEach(category => {
                const button = document.createElement('button')
                button.className = 'job__categories-btn'
                button.setAttribute(`data-category`, category)
                button.textContent = category
                context.append(button)
            })
        }
    });
}