{-# LANGUAGE TemplateHaskell, DeriveDataTypeable, OverloadedStrings #-}

module Group where

import Data.Aeson.TH
import Data.Data
import Data.IORef
import Data.Text.Lazy (Text)
import System.IO.Unsafe

data Group = Group
  { groupId :: Int
  , groupName :: Text
  } deriving (Show, Read, Eq, Ord, Data, Typeable)
deriveJSON id ''Group

groupRef :: IORef [Group]
groupRef = unsafePerformIO $ newIORef
  [ Group 1 "a-group"
  , Group 2 "b-group"
  ]

getGroups :: IO [Group]
getGroups = readIORef groupRef

putGroup :: Group -> IO ()
putGroup group = modifyIORef groupRef (++ [group])
