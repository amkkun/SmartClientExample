{-# LANGUAGE TemplateHaskell, DeriveDataTypeable, OverloadedStrings #-}

module User where

import Data.Aeson.TH
import Data.Data
import Data.IORef
import Data.Text.Lazy (Text)
import System.IO.Unsafe

data User = User
  { userId :: Int
  , userName :: Text
  , userUserName :: Text
  } deriving (Show, Read, Eq, Ord, Data, Typeable)
deriveJSON id ''User

userRef :: IORef [User]
userRef = unsafePerformIO $ newIORef
  [ User 1 "aa aa" "aa"
  , User 2 "bb bb" "bb"
  , User 3 "cc cc" "cc"
  ]

getUsers :: IO [User]
getUsers = readIORef userRef

addUser :: User -> IO ()
addUser user = modifyIORef userRef (++ [user])
