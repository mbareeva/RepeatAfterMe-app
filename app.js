/*
This is a platform for those who love travelling.
After registration the user can share with others the route of the trip.
With the help of experience of other users, you do not have to worry about
making up a plan of a trip. You can just look up the post with map and locations
on it, reviews of visited places, save the post and repeat the experience.

Four classes: User, Post, Map, Location.#

User can post Post(s)
Post should contain Map
Map has Locations on it
*/
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const UserService = require('./services/user-service')
const PostService = require('./services/post-service')
const MapService = require('./services/map-service')
const LocationService = require('./services/location-service')

require('./mongo-connection')

const app = express()
app.use(cors())

app.set('view engine', 'pug')
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})

//User Endpoints

app.get('/contributors/all-list', async (req, res) => {
    const contributors = await UserService.findAll()
    res.render('contributors', { contributors })
})

app.get('/contributors/all', async (req, res) => {
    const contributors = await UserService.findAll()
    res.send(contributors)
})

app.get('/contributors/:id', async (req, res) => {
    const contributor = await UserService.find(req.params.id)
    res.render('data', {data: contributor})
})

app.get('/contributors/:id/json', async (req, res) => {
  const contributor = await UserService.find(req.params.id)
  if(!user) res.status(404)
  res.send(contributor)
})


app.get('/contributors/name/:name', async (req, res) => {
    const contributor = await UserService.findByName(req.param.name)
    res.send(contributor)
})

app.post('/contributors', async (req, res) => {
   const user = await UserService.add(req.body)
   res.send(user)
})
app.post('/contributors/:id/addPost', async (req, res) => {
    const contributors = await UserService.addPost(req.params.id, req.body.postId)
    res.send(contributors)
  })

app.delete('/contributors/:id', async (req, res) => {
    const user = await UserService.del(req.params.id)
    res.send(user)
  })



// Post Endpoints

app.get('/posts/all-list', async (req, res) => {
    const posts = await PostService.findAll()
    res.render('posts', { posts })
  })

  app.get('/posts/all', async (req, res) => {
    const posts = await PostService.findAll()
    res.send(posts)
  })
  
  app.get('/posts/:id', async (req, res) => {
    const post = await PostService.find(req.params.id)
    res.render('data', { data: post })
  })

  app.get('/posts/:id/json', async (req, res) => {
    const post = await PostService.find(req.params.id)
    if(!meetup) res.status(404)
    res.send(post)
  })
  app.post('/posts', async (req, res) => {
    const post = await PostService.add(req.body)
    res.send(post)
  })
  
  app.post('/posts/:id/addMap', async (req, res) => {
    const post = await PostService.addMap(req.params.id, req.body.mapId)
    res.send(post)
  })
  
  app.delete('/posts/:id', async (req, res) => {
    const post = await PostService.del(req.params.id)
    res.send(post)
  })

 

  //Map Endpoints

  app.get('/map/all-list', async (req, res) => {
    const maps = await MapService.findAll()
    res.render('maps', { maps })
  })

  app.get('/map/all', async (req, res) => {
    const maps = await MapService.findAll()
    res.send(maps)
  })
  app.get('/map/:id', async (req, res) => {
    const map = await MapService.find(req.params.id)
    res.render('data', { data: map })
  })

  app.get('/map/:id/json', async (req, res) => {
    const map = await MapService.find(req.params.id)
    if (!map) res.status(404)
    res.send(map)
  })
  
  app.post('/map', async (req, res) => {
    const map = await MapService.add(req.body)
    res.send(map)
  })
  
  app.post('/map/:id/addLocation', async (req, res) => {
    const map = await MapService.addLocation(req.params.id, req.body.locationId)
    res.send(map)
  })

  app.delete('/map/:id', async (req, res) => {
    const map = await MapService.del(req.params.id)
    res.send(map)
  })

  

  //Location Endpoints

  app.get('/location/all-list', async (req, res) => {
    const locations = await LocationService.findAll()
    res.render('locations', { locations })
  })

  app.get('/location/all', async (req, res) => {
    const locations = await locationService.findAll()
    res.send(locations)
  })

  app.get('/location/:id', async (req, res) => {
    const location = await LocationService.find(req.params.id)
    res.render('data', { data: location })
  })

  app.get('/location/:id/json', async (req, res) => {
    const location = await LocationService.find(req.params.id)
    if (!location) res.status(404)
    res.send(location)
  })
  
  
  app.post('/location', async (req, res) => {
    const location = await LocationService.add(req.body)
    res.send(location)
  })
  app.delete('/location/:id', async (req, res) => {
    const location = await LocationService.del(req.params.id)
    res.send(location)
  })
  

  module.exports = app