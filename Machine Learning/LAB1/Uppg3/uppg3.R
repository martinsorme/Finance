dataframe <- read.csv('pima-indians-diabetes.csv', header = FALSE)
color_values <- c("blue", "red")
set.seed(12345)


#################################### TASK 1 ####################################

# Independent variables
pgc <- dataframe$V2 # Plasma glucose concentration
age <- dataframe$V8

# Dependent variables
diabetes <- dataframe$V9


plot(age, pgc, col = ifelse(diabetes == 1, "red", "darkblue"),
     xlab = "Age", ylab = "Plasma Glucose Concentration",
     main = "Scatterplot of Plasma Glucose on Age")

# Legend
legend("topright", legend = c("No Diabetes", "Diabetes"),
       col = c("darkblue", "red"), pch = 1)


#Do you think that Diabetes is easy to classify by a standard logistic regression model 
#that uses these two variables as features? Motivate your answer. 
#Motivation: No, not easy to classify. Hard to determine based on only these factors.
#if we look at the plot there is no intuitive way to determine diabetes/no diabetes


#################################### TASK 2 ####################################

logistic_model <- glm(diabetes ~ pgc + age, data = dataframe, family = "binomial")

summary(logistic_model)

prediction <- predict(logistic_model, dataframe, type = "response")
# r = 0.5
prediction1 <- ifelse(prediction > 0.5, 1, 0)

# Confusion matrix
confusion_matrix <- table(prediction1, diabetes)
print(confusion_matrix)

# Missclassification
misclass <- (1 - sum(diag(confusion_matrix)) / length(prediction1))
print(paste("Misclassification error:", misclass)) #0.2630208


plot(age, pgc, col = color_values[as.factor(prediction1)],
     xlab = "Age", ylab = "Plasma Glucose Concentration",
     main = "Scatter Plot")

# Legend
legend("topright", legend = c("Predicted diabetes: 1", "Predicted diabetes: 0"),
       col = c("blue", "black"), pch = 1)


#################################### TASK 3 ####################################

# Plot
plot(age, pgc, col = color_values[as.factor(prediction1)],
     xlab = "Age", ylab = "Plasma Glucose Concentration",
     main = "Scatter Plot")

# Decision boundry line
abline(a = coef(logistic_model)[["(Intercept)"]] / (-coef(logistic_model)[["pgc"]]),
       b = coef(logistic_model)[["age"]] / (-coef(logistic_model)[["pgc"]]),
       col = "red")


#################################### TASK 4 ####################################

# Prediction threshold r=0.2
prediction_2 <- ifelse(prediction > 0.2, 1, 0)

# Prediction threshold r=0.8
prediction_3 <- ifelse(prediction > 0.8, 1, 0)

# r=0.2
plot(age, pgc, col = color_values[as.factor(prediction_2)],
     xlab = "Age", ylab = "Plasma Glucose Concentration",
     main = "Scatter Plot for r=0.2")
legend("topright", legend = c("Predicted diabetes: 1", "Predicted diabetes: 0"),
       col = c("blue", "black"), pch = 1)


# Missclassification for r=0.2
confusion_matrix2 <- table(prediction_2, diabetes)
print(confusion_matrix2)
## Comment: Frequent prediction of diabates when this is not the case

misclass2 <- (1 - sum(diag(confusion_matrix2)) / sum(confusion_matrix2))
print(paste("Misclassification error:", misclass2)) #0.37239583

# r=0.8
plot(age, pgc, col = color_values[as.factor(prediction_3)],
     xlab = "Age", ylab = "Plasma Glucose Concentration",
     main = "Scatter Plot for r=0.8")
legend("topright", legend = c("Predicted diabetes: 1", "Predicted diabetes: 0"),
       col = c("blue", "black"), pch = 1)



# Misclassification for r=0.8
confusion_matrix3 <- table(prediction_3, diabetes)
print(confusion_matrix3)
## Comment: Frequent missed prediction of diabetes
misclass3 <- (1 - sum(diag(confusion_matrix3)) / sum(confusion_matrix3))
print(paste("Misclassification error:", misclass3)) #0.31510416


## When the r value is 0.2, the model will predict mostly diabetes=true, 
## while it is 0.8 the model will predict mostly diabetes=false. 
## Overall, both values lead to a high misclassification rate. 


#################################### TASK 5 ####################################

dataframe$z1 <- pgc^4
dataframe$z2 <- pgc^3 * age
dataframe$z3 <- pgc^2 * age^2
dataframe$z4 <- pgc * age^3
dataframe$z5 <- age^4
y <- diabetes

model <- glm(y ~ pgc + age + z1 + z2 + z3 + z4 + z5, data = dataframe, family = "binomial")
summary(model)

prediction_basis <- predict(model, dataframe, type = "response")
prediction_basis <- ifelse(prediction_basis > 0.5, 1, 0)

# Confusion Matrix and misclassification rate
cm_basis <- table(prediction_basis, y)
print(cm_basis)
misclass_basis <- (1 - sum(diag(cm_basis)) / sum(cm_basis))
print(paste("Misclassification error of new model:", misclass_basis))


plot(age, pgc, col = color_values[as.factor(prediction_basis)],
     xlab = "Age", ylab = "Plasma Glucose Concentration",
     main = "Scatter Plot on basis model")

# Add the decision boundary line
x_vals <- seq(min(age), max(age), length.out = 100)
y_vals <- seq(min(pgc), max(pgc), length.out = 100)

# Expanded grid with basis functions
new_data <- expand.grid(age = x_vals, pgc = y_vals)
new_data$z1 <- new_data$pgc^4
new_data$z2 <- new_data$pgc^3 * new_data$age
new_data$z3 <- new_data$pgc^2 * new_data$age^2
new_data$z4 <- new_data$pgc * new_data$age^3
new_data$z5 <- new_data$age^4

# Add the decision boundary
contour(x = x_vals, y = y_vals, z = matrix(predict(model, newdata = new_data, type = "response"), ncol = length(y_vals)), levels = 0.5, add = TRUE, col = "red")

