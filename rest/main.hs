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
  post "/addUser" $ do
    user <- jsonData
    liftIO $ addUser user
  get "/getGroups" $ do
    groups <- liftIO getGroups
    json groups
  post "/addGroup" $ do
    group <- jsonData
    liftIO $ addGroup group
  get "/" $ text "hello"
