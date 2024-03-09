#libraries
library(caret)
library(ggplot2)

#Clear global environment
rm(list = ls())

############################## Task 1 ##########################################
#Scale the data and manually implement PCA

#Reading the dataset and excluding the target variable ViolentCrimesPerPop for PCA
communities_data = read.csv("communities.csv")
VCPP_excluded = communities_data[,1:100]

#Scaling the data
scaler = preProcess(VCPP_excluded) 
data_scaled = predict(scaler, VCPP_excluded) 

#Calculating the covariance matrix of the scaled data and computing the eigenvalues
cov_matrix = cov(data_scaled)
eigen_values = eigen(cov_matrix) #The values vector is sorted in decreasing order

#Calculating the cumulative proportion of variance explained by each PC
#Using the match() function to find how many components are needed to obtain 95% of the variance
cumulative_variance = cumsum(eigen_values$values)
match(TRUE, cumulative_variance >= 95) #35 PCs
print(cumulative_variance) #printing the cumulative_variance vector to verify the step above
print(eigen_values$values[1]) #25.01699
print(eigen_values$values[2]) #16.93597

#Plotting the variance of the 10 first componentents in a barplot for visualization purposes
PCA = data.frame(PCA = 1:10, Variance = (eigen_values$values)[1:10])
ggplot(PCA, aes(x = PCA, y = Variance)) + geom_bar(stat = "identity") + labs(title = "Variance of Principal Components", x = "Principal Component", y = "Variance Explained (%)") + theme_minimal()

############################## Task 2 ##########################################
#Repeat PCA using princomp(), make trace plot of the first principal component

PCA_res = princomp(data_scaled)
#Sorting the absolute values of the first PC's loadings in descending order
PC1_sorted = sort(abs(PCA_res$loadings[,1]), decreasing = TRUE)
plot(PC1_sorted, main="Traceplot PC1", col = "blue", cex = 0.5, ylab = "loadings")
print(head(PC1_sorted, 5)) #The 5 features that contribute mostly

#Plotting the PC scores
Violent_Crimes = communities_data$ViolentCrimesPerPop
ggplot(data.frame(PC1 = PCA_res$scores[,1], PC2 = PCA_res$scores[,2]), aes(x=PC1, y=PC2)) + geom_point(aes(color = Violent_Crimes)) + scale_color_gradient(low = "blue", high = "red") + ggtitle("PC scores") + xlab("PC1 scores") +  ylab("PC2 scores") +  theme_minimal()

############################## Task 3 ##########################################

#Splitting the data into training and test
set.seed(12345)
n=nrow(communities_data)
id=sample(1:n, floor(n*0.5))
train=communities_data[id,]
test=communities_data[-id,]

#Scaling the data
scaler = preProcess(train) 
train_scaled = predict(scaler, train)
test_scaled = predict(scaler, test)

#linear regression
fit1=lm(ViolentCrimesPerPop ~ ., data=train_scaled)
summary(fit1)

#Predicting ViolentCrimesPerPop using the linear model
predicted_train = predict(fit1, train_scaled)
predicted_test = predict(fit1,test_scaled)

#Calculate Mean Squared Error for training and test data
mse_train = mean((train_scaled$ViolentCrimesPerPop - predicted_train)^2)
mse_test = mean((test_scaled$ViolentCrimesPerPop - predicted_test)^2)

print(paste("Training MSE: ", mse_train)) #~0.275
print(paste("Test MSE: ", mse_test)) #~0.425

############################## Task 4 ##########################################
#Some global variable used in calculations below
#Empty vectors for storing MSE values to be plotted
MSE_training = c()
MSE_testing = c()
#scaled training params, VCPP excluded
x_train = as.matrix(train_scaled[,-101])
x_test = as.matrix(test_scaled[,-101])
#Target variable
target_train = train_scaled$ViolentCrimesPerPop
target_test = test_scaled$ViolentCrimesPerPop

#Implementation of cost function
cost_function = function(theta) {
  predictions_train = x_train %*% theta
  predictions_test = x_test %*% theta
  
  mse_train = mean((target_train - predictions_train)^2)
  mse_test = mean((target_test - predictions_test)^2)
  #Saving the MSE values to the vector
  MSE_training <<- c(MSE_training, mse_train)
  MSE_testing <<- c(MSE_testing, mse_test)
  return(mse_train)
}

#starting at theta = 0
theta = rep(0, ncol(x_train))
#Using the optim() fucntion to optimize the cost
opt_result = optim(par = theta, fn = cost_function, method = "BFGS")

#takes the minimum MSE testing value to see which iteration that is optimal
min_test = which.min(MSE_testing)
min_train = which.min(MSE_training)

#printing the optimal training and test MSE
print(MSE_testing[min_test]) #~0.400
print(MSE_training[min_train]) #~0.275
#the index for the iteration numner for optimal test MSE
print(min_test)

#defining start and endpoints for the graph
startpoint = 500
endpoint = 20000
#Plotting the training MSE
plot(MSE_training[startpoint:endpoint], type = "l", col = "red", lwd = 1, ylim = c(0, 1), xlim = c(startpoint, endpoint), xlab = "Iteration", ylab = "MSE", main = "MSE per iteration")
#Adding the testing MSE line
lines(MSE_testing[startpoint:endpoint], col = "blue", lwd = 1)
#Marking the min test MSE, adding startpoint as offset
points(min_test - startpoint, MSE_testing[min_test], col = "green")
points(min_train - startpoint, MSE_training[min_train], col = "green")
#Adding a legend to the plot
legend("topright", legend = c("Training MSE", "Testing MSE"), col = c("red", "blue"), lwd = 1, cex = 0.8)

