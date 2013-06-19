{-# LANGUAGE OverloadedStrings #-}

import Control.Monad.IO.Class (liftIO)
import Web.Scotty

import Group
import User

main :: IO ()
main = scotty 3000 $ do
  get "/getUsers" $ do
    users <- liftIO getUsers
    json users
  get "/getGroups" $ do
    groups <- liftIO getGroups
    json groups
  get "/" $ text "hello"
