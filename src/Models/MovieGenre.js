const MovieGenrestorage = require("./MovieGenrestorage")

class MovieGenre {
    constructor(body){
        this.body = body;
        this.Info = new MovieGenrestorage(body)
    }
    async read(){
        const body = this.body;

        try{
            const column = "genre,ID"
            const where = "group by genre order by genre asc"
            const value = []
            const response =  await MovieGenrestorage.read(column,where,value)
            return{success:true , message:'success', data:response.data}

        }catch(err){
            console.log(err)
            return {success:false, message: 'read error', err:err}
        }
    }

    async read_user_genre(){
        const body = this.body
        const db = "heroku_b4f2e40008aca92"
        try{
            const column = `${db}.movie_genre.genre, count(${db}.movie_genre.genre) as count`
            const where = `inner join (SELECT movieID FROM ${db}.movie_rate where userID = ? and rate = 'like' order by date desc limit 10) Rate 
            on ${db}.movie_genre.movieID = Rate.movieID group by ${db}.movie_genre.genre order by count desc limit 2`
            const value = [body.userID]
            const response = await MovieGenrestorage.read(column ,where,value)
            return{success:true, message:'success', data:response.data}
        }catch(err){
            console.log(err)
            return {success:false, message: 'read error', err:err}
        }
    }


}

module.exports = MovieGenre