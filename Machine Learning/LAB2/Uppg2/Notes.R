#Notes
library(dplyr)

# Excluding the column 'C12' from the train data frame
train_modified <- select(train, -C12)

# Exclude the column by using negative indexing
train_modified = train[, -index_to_exclude]

#Selecting three different columns in two different ways
library(dplyr)
selected_data = train %>% select(C1, C9, C10)
covariates=as.matrix(train[, c(1,9,10)])
