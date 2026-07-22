from django.db import models

class Product(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    product_name = models.CharField(max_length=100)
    description = models.TextField()
    qty = models.IntegerField(default=1)

    product_image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product_name
    
    
from django.contrib.auth.models import User


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} ({self.user.username})"
    
    # Optional helper to calculate total price of this item
    def get_total_price(self):
        return self.quantity * self.product.price