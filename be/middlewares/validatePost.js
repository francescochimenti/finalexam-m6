const validatePost = (req, res, next) => {
    const error = []

    const { title, category, cover, readTime, author, content } = req.body

    // Validate title
    if(typeof title !== 'string' || title.length < 3) {
        error.push('title must be a string of at least 3 characters')
    }

    // Validate category
    if (typeof category !== 'string') {
        error.push('category must be a string')
    }

    // Validate cover
    if (typeof cover !== 'string') {
        error.push('cover must be a string')
    }

    // Validate readTime
    if (!readTime || typeof readTime.value !== 'number' || typeof readTime.unit !== 'string') {
        error.push('readTime must have a numeric value and a string unit')
    }

    // Validate author
    if (!author || typeof author.name !== 'string' || typeof author.avatar !== 'string') {
        error.push('author must have a name and avatar, both of which should be strings')
    }

    // Validate content
    if (typeof content !== 'string') {
        error.push('content must be a string')
    }

    // Return errors, if any
    if (error.length) {
        return res.status(400).send({
            statusCode: 400,
            message: error
        })
    }

    next()
}

module.exports = validatePost
