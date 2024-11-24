#libraries
library(geosphere)

rm(list = ls())

set.seed(1234567890)
stations <- read.csv("stations.csv", fileEncoding = "latin1")
temps <- read.csv("temps50k.csv")
st <- merge(stations,temps,by="station_number")

# The point to predict (adress in vallastaden, Linköping)
a <- 58.393379 #latitud
b <- 15.584957 #longitud
  
date <- "2010-12-24" # The date to predict
times <- c("04:00:00", "06:00:00", "08:00:00", "10:00:00",
           "12:00:00", "14:00:00", "16:00:00", "18:00:00",
           "20:00:00", "22:00:00", "24:00:00")

#Filter out times and dates that should not be included
specified_date = as.POSIXct(date, format = "%Y-%m-%d")
st$date = as.POSIXct(st$date, format = "%Y-%m-%d")
st$time = format(strptime(st$time, format = "%H:%M:%S"), "%H:%M:%S")
st = st[st$date <= specified_date & st$time %in% times,]

#kernel function
gaussianKernel = function(x_diff, h) {
  return(exp(-(x_diff / h)^2))
}

#function to calculate the distance between the point to predict and the station coordinates
calc_distance_diff = function() {
  stations_coordinates = matrix(c(st$longitude, st$latitude), ncol = 2)
  POI = matrix(c(b,a), ncol = 2)
  dist_diff = distHaversine(stations_coordinates, POI)
  return(dist_diff)
}

#Function to calculate the difference between the day to predict and the day of the measurement
calc_date_diff = function() {
  day_diff = as.numeric(difftime(date, st$date, units = "days")) %% 365
  return(day_diff)
}

#Function to calculate the difference between hours to predict and the hours the measurements were taken
calc_hour_diff = function(hour) {
  hour_diff = abs(as.numeric(difftime(strptime(times[hour], format = "%H:%M:%S"),strptime(cbind(st$time), format = "%H:%M:%S"), units = "hours")))
  return(hour_diff)
}

#function to plot kernel values against distance/days/hours
plot_kernel_vs_distance = function(h_value, against, xlim_value, v_value) {
  kernel_value = gaussianKernel(against, h_value)
  plot(against, kernel_value, type = "p", main = "Kernel Value vs Distance", xlab = "Distance", ylab = "Kernel Value", col = "black", cex = 0.5, xlim =c(0,xlim_value))
  abline(h = 0.5, col = 'red', lty = 2) 
  abline(v = v_value, col = 'red', lty = 2) 
}

#some h_values to test for distance
h_values = c(10000, 20000, 50000, 80000, 100000, 120000)
for(h_value in h_values) {
  plot_kernel_vs_distance(h_value, calc_distance_diff(), 300000, 100000)
}

#some h_values to test for days
h_values = c(2, 5, 7, 8, 9, 10)
for(h_value in h_values) {
  plot_kernel_vs_distance(h_value, calc_date_diff(), 20, 7)
}

#some h_values to test for hours
h_values = c(2, 4, 6, 8, 10, 12)
for(h_value in h_values) {
  plot_kernel_vs_distance(h_value, calc_hour_diff(), 15, 5)
}

#h_values final
h_distance = 120000
h_date = 8
h_time = 6

#date & distance Kernels
date_kernel = gaussianKernel(calc_date_diff(), h_date)
dist_kernel = gaussianKernel(calc_distance_diff(), h_distance)

#temperature vectors
temp_sum = vector(length=length(times))
temp_prod = vector(length=length(times))

#looping through the hours in the times vector
for(hour in seq_along(times)) {
  hour_diff = calc_hour_diff(hour)
  hours_kernel = gaussianKernel(hour_diff, h_time)
  
  #Sum and product of the kernels
  kernel_sum = dist_kernel + date_kernel + hours_kernel
  kernel_prod = dist_kernel * date_kernel * hours_kernel
  
  #Add the temperatures to the temperature vectors
  temp_sum[hour] = sum(kernel_sum %*% st$air_temperature) / sum(kernel_sum)
  temp_prod[hour] = sum(kernel_prod %*% st$air_temperature) / sum(kernel_prod)
}

#Plotting temperatures for both sum and prod kernels
plot(temp_sum, type="o", main = "Temperature prediction", xlab = "Time of day (h)", ylab = "Temperature (°C)", col = "blue", ylim = c(-4, 6), xaxt="n")
lines(temp_prod, type="o", col = "red")
axis(1, at = seq_along(times),  labels=substring(times, 1, 2))
legend("bottomright", c("Sum. kernel", "Prod. kernel"), col = c("blue", "red"),  pch=1, lty=1, box.lty=1, cex=0.8)