// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const uuid = require('uuid');
const { projects } = require('./projectsData.js')

export default (req, res) => {
    res.statusCode = 200;
    res.json(projects)
}
