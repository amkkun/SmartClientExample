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
    uId <- param "userId"
    uName <- param "userName"
    uUserName <- param "userUserName"
    liftIO $ addUser $ User uId uName uUserName
    text "ok"
  post "/addUserJSON" $ do
    user <- jsonData
    liftIO $ addUser user
    text "ok"
  post "/updateUser" $ do
    user <- jsonData
    liftIO $ updateUser user
    text "ok"
  post "/deleteUser" $ do
    i <- param "userId"
    liftIO $ deleteUser i
    text "ok"
  get "/getGroups" $ do
    groups <- liftIO getGroups
    json groups
  post "/addGroup" $ do
    gId <- param "groupId"
    gName <- param "groupName"
    liftIO $ addGroup $ Group gId gName
    text "ok"
  get "/" $ text "hello"
