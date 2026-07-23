from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt 
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

from django.contrib.auth import authenticate, login, logout
@csrf_exempt
def login_page(request):
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username = username, password = password)
        
        if user is not None:
            login(request, user)
            messages.success(request, 'Login successful!')
            return redirect('indexpage')
        else:
            messages.error(request, 'Invalid username or password.')
            return redirect('loginpage')
            
    return render(request, 'pages/loginpage.html')

def msg(request):
    return render(request, "pages/msg.html")

def index_page(request):
    return render(request, "pages/indexpage.html")


def cart_page(request):
    return render(request, "pages/cartpage.html")

def add_to_cart(request):
    if request.method == 'POST':
        import json
        data = json.loads(request.body)
        product_id = data.get('product_id')
        

        product = get_object_or_404(Product, id=product_id)
        
     
        cart = request.session.get('cart', {})
        
     
        if str(product_id) in cart:
            cart[str(product_id)] += 1
        else:
            cart[str(product_id)] = 1
            
        request.session['cart'] = cart
        
        
        total_items = sum(cart.values())
        
        return JsonResponse({'status': 'success', 'total_items': total_items})
        
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

def ShowCartItemsView(request):
    if request.user.is_authenticated:
      
        cartis, created = UserCart.objects.get_or_create(user=request.user)
        
        
        cartitems = CartItems.objects.filter(cart=cartis.id)
        
       
        total_price = Decimal("0.00")
        for item in cartitems:
            item.item_total_price = item.quantity * item.product.price
            total_price += item.item_total_price
            
        
        context = {
            'cartitemsdata': cartitems,
            'total_price': total_price,
        }
        
       
        return render(request, 'pages/showcartitems.html', context)
        
    else:
        
        return render(request, 'pages/showcartitems.html', {'cartitemsdata': [], 'total_price': Decimal("0.00")})
    
    


def registerpage(request):
    if request.method == 'POST':
  
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()  
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created successfully for {username}!')
            return redirect('login')  
    else:
        
        form = UserCreationForm()
        
    context = {'form': form}
    return render(request, 'register.html', context)

