########### Libraries #############
library(glmnet)
library(dplyr)
library(caret)

# Clear global env.
rm(list = ls())


############## Read data and divide it into test and train ##############
set.seed(12345)
df <- read.csv('tecator.csv', header=TRUE)
data <- (df)[2:102] #Relevant columns

n = dim(data)[1] 
id = sample(1:n, floor(n * 0.5)) # Take a random sample
train_data = data[id, ]
test_data = data[-id, ]


#################################### TASK 1 ####################################

# Model
fit = lm(Fat ~ . ,data = train_data)
summary(fit)

# Predictions
prediction_train = predict(fit, train_data)
prediction_test = predict(fit, test_data)

# Calculating errors, Mean Squared Error
mse_train = mean((train_data$Fat - prediction_train)^2)
mse_test = mean((test_data$Fat - prediction_test)^2)

print(paste("Train MSE: ", mse_train)) # 0.00570911701090834
print(paste("Test MSE: ", mse_test)) # 722.429419336971


#################################### TASK 2 ####################################

# ...

#################################### TASK 3 ####################################

## LASSO regression

x = as.matrix(train_data %>% select(-Fat))
y = as.matrix(train_data %>% select(Fat))

lasso = glmnet(x, y, alpha = 1, family = "gaussian")
plot(lasso, xvar = "lambda", label = TRUE, main="Lasso regression model")

#################################### TASK 4 ####################################

## Ridge regression

ridge = glmnet(x, y, alpha = 0, family="gaussian")
plot(ridge, xvar = "lambda", label = TRUE, main="Ridge regression")

#################################### TASK 5 ####################################

cross_validation = cv.glmnet(x, y, alpha=1, family="gaussian")
plot(cross_validation)
opt_lambda = cross_validation$lambda.min # 0.05744535


coef(cross_validation, s = "lambda.min")
summary(cross_validation)
# Channels 52, 51, 41, 40, 16, 15, 14, 13. 8 total

# Cross validation prediction
crossval_predict = predict(cross_validation, newx = x, s = opt_lambda)

plot(test_data$Fat, col="red", ylim = c(0,60), ylab="Fat levels", main = "Test vs model with optimal lambda")
points(crossval_predict, col = "green")
legend("topright", c("actual", "predicted"), col = c("red", "green"), pch = 1, cex = 0.8)


#################################### EXTRA ####################################

# Testing the channels derived from LASSO with linear regression model
fit_new <- lm(Fat ~ Channel52 + Channel51 + Channel41 + Channel40 + Channel16 + Channel15 + Channel14 + Channel13, data = train_data)
ptrain_new = predict(fit_new, train_data)
ptest_new = predict(fit_new, test_data)

mse_train_new = mean((train_data$Fat - ptrain_new)^2)
mse_test_new = mean((test_data$Fat - ptest_new)^2)

print(paste("Train MSE: ", mse_train_new)) # 5.10650377834861
print(paste("Test MSE: ", mse_test_new)) # 15.7160188358832

