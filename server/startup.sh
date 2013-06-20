#!/bin/bash

cabal-dev install
./cabal-dev/bin/smart-client-example &
mighty ./mighty.conf ./mighty.route
