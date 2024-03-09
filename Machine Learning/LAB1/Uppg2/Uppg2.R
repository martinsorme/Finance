#libraries
library(caret)
library(dplyr)

# Clear global environment
rm(list = ls())

########################## Task 1 ##########################################
#Divide the data into training and test (60/40) and scale it appropriately.

#Clean the data
ps_data = read.csv("parkinsons.csv", header = TRUE)
ps_clean_data = ps_data[,5:22] # Exclude subject, age, sex and test_time columns
ps_clean_data = ps_clean_data[,-2] #Exclude total_updirs => total of 17 vars

#Divide the data into training and test sets
set.seed(12345)  # For reproducibility
n = dim(ps_clean_data)[1] #numb of rows/obs
id = sample(1:n, floor(n * 0.6)) #take a random sample
train_data = ps_clean_data[id, ]
test_data = ps_clean_data[-id, ]

#Scale the data
scaler = preProcess(train_data) #subtracts mean and divides by std by using the default method: c("center", "scale")
train_scaled = predict(scaler, train_data) #scaling the training data by applying scaler transform
test_scaled = predict(scaler, test_data)

############################### Task 2 ######################################
#Building the linear regression model using the training data
ps_model = lm(motor_UPDRS ~ . , data = train_scaled)  
summary(ps_model)

#Analysis of P-value to visualize the most significant variables 
coefficients = summary(ps_model)$coefficients #Extracting coefficients and p-values from the summary

#Creating a data frame for the significant variables
significant_vars = data.frame(value = coefficients[coefficients[, "Pr(>|t|)"] < 0.05, "Pr(>|t|)"])
print(significant_vars)

#Predicting 'motor_UPDRS' using the linear model
predicted_train = predict(ps_model, train_scaled)
predicted_test = predict(ps_model,test_scaled)

#Calculate Mean Squared Error for training and test data
mse_train = mean((train_scaled$motor_UPDRS - predicted_train)^2)
mse_test = mean((test_scaled$motor_UPDRS - predicted_test)^2)

print(paste("Training MSE: ", mse_train))
print(paste("Test MSE: ", mse_test))

############################### Task 3 ######################################
#global variables for the functions
n = nrow(train_scaled) #Number of observations
y = as.matrix(train_scaled$motor_UPDRS) #The observed value in the motor_UPDRS column
x = as.matrix(train_scaled)[,2:17] #The predictor variables, columns Jitter... to PPE

#Loglikelihood: how well the model fits the data
loglikelihood = function(theta, sigma) {
  return(-n / 2 * log(2 * pi * sigma^2) - (1 / (2 * sigma^2)) * sum((y - x %*% theta)^2))
}

#Ridge function
# Ridge penalty prevents overfitting by shrinking the coefficients 
#=> less model complexity and improved generalization.
ridge_function = function(theta, lambda){
  sigma = theta[length(theta)]
  theta = theta[-17]
  # Calculate the Ridge penalty
  ridge_penalty = lambda * sum(theta^2)
  #call logLikelihood and add ridge_penalty to get ridge_value
  ridge_value = -loglikelihood(theta, sigma) + ridge_penalty
  return(ridge_value)
}

#Finds the parameter values that minimizes the loss function, starting from an initial guess.
RidgeOpt = function(lambda) {
  # Initial guesses for theta and sigma (17 ones)
  initial_guess = rep(1, 17)
  # Use optim to minimize the ridge regression loss function
  return(optim(initial_guess, fn = ridge_function, lambda = lambda, method = "BFGS"))
}

#Degree of freedom function
DF = function(lambda) {
  # Ensure the diagonal matrix I has the same dimensions as the number of predictors in x
  I = diag(ncol(x))
  # Compute the hat matrix H
  H = x %*% solve(t(x) %*% x + lambda * I) %*% t(x)
  # Calculate the degrees of freedom as the sum of the diagonal elements of H
  return(sum(diag(H)))
}

#######################################Task 4########################################
# Defining lambda values
lambda_values <- c(1, 100, 1000)

#converting into matrices
x_train <- as.matrix(train_scaled %>% select(Jitter...:PPE))
x_test <- as.matrix(test_scaled %>% select(Jitter...:PPE))

#Loop through the lambda vector
for (l in lambda_values) {
  #computing optimal theta coefficients
  theta_opt = RidgeOpt(lambda = l)
  #extracting optimal coefficients
  opt_extracted = as.matrix(theta_opt$par[-17])
  pred_train_opt = x_train %*% opt_extracted
  pred_test_opt  = x_test %*% opt_extracted
  #MSE for training and test
  mse_train_opt = mean((train_scaled$motor_UPDRS - pred_train_opt)^2)
  mse_test_opt  = mean((test_scaled$motor_UPDRS  - pred_test_opt)^2)
  #degrees of freedom for respective lambda value
  df = DF(lambda = l)
  #prints
  print(paste("lambda =",l,"MSE training:", mse_train_opt))
  print(paste("lambda =",l,"MSE training:", mse_test_opt))
  print(paste("lambda =",l,"Degrees of freedom:", df))
}