package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

const (
	host     = "localhost"
	port     = 3306
	user     = "root"
	password = "admin"
	dbname   = "animedatabase"
)

var db *sql.DB

func main() {
	mysqlInfo := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s",
		user, password, host, port, dbname)

	var err error

	db, err = sql.Open("mysql", mysqlInfo)
	if err != nil {
		log.Fatalf("Error opening database: %s", err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatalf("Error pinging database: %s", err)
	}
	fmt.Println("Connected to database")

	http.HandleFunc("/allanime", getAnimeDetail)

	log.Println("Registered endpoint: /allanime")
	log.Println("Server starting on localhost:8000...")
	log.Fatal(http.ListenAndServe(":8000", nil))
}

type AnimeDetail struct {
	ID         int             `json:"id"`
	Title      string          `json:"title"`
	Picture    string          `json:"picture"`
	Score      sql.NullFloat64 `json:"score"`
	Rank       sql.NullInt32   `json:"rank"`
	Popularity sql.NullInt32   `json:"popularity"`
	Synopsis   sql.NullString  `json:"synopsis"`
	Episodes   sql.NullInt32   `json:"episodes"`
	Status     string          `json:"status"`
	Aired      string          `json:"aired"`
	Genres     sql.NullString  `json:"genres"`
}

// loading all at once is very demanding therefore i should probably do pages 50 preg
func getAnimeDetail(w http.ResponseWriter, r *http.Request) {
	log.Println("Received request for /allanime")

	sqlStatement := `SELECT * FROM allanime`
	log.Println("Executing database query")

	rows, err := db.Query(sqlStatement)
	if err != nil {
		http.Error(w, "Database query error", http.StatusInternalServerError)
		log.Printf("Database query error: %s", err)
		return
	}
	defer rows.Close()

	log.Println("Query executed successfully")
	var animeList []AnimeDetail

	for rows.Next() {
		var anime AnimeDetail
		err := rows.Scan(&anime.ID, &anime.Title, &anime.Picture, &anime.Score, &anime.Rank, &anime.Popularity, &anime.Synopsis, &anime.Episodes, &anime.Status, &anime.Aired, &anime.Genres)
		if err != nil {
			http.Error(w, "Error scanning data", http.StatusInternalServerError)
			log.Printf("Error scanning data: %s", err) // Log error with detailed message
			return
		}

		log.Printf("Anime: %+v\n", anime) // Log the entire anime object
		animeList = append(animeList, anime)
	}

	if err = rows.Err(); err != nil {
		http.Error(w, "Error iterating rows", http.StatusInternalServerError)
		log.Printf("Error iterating rows: %s", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(animeList); err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		log.Printf("Error encoding JSON: %s", err)
	}
}

// func getAnimeGenre(w http.ResponseWriter, r *http.Request) {

// }
