#!/bin/env bash


# from postgres tmdb_cache
# \copy (select tmdb_id, title, tagline from movie where popularity > 700 order by popularity desc) to '/tmp/test.csv' csv;
cat /tmp/test.csv | cut -d, -f2,3 | tr -d '\".' | tr ',' ' '
