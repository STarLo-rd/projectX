from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
# Create your views here.

def say_hello(request):
    data = {'message': 'hello world'}
    return JsonResponse(data)


@csrf_exempt
@require_http_methods(["POST"])
def predict(request):
    try:
        # Assuming the input features are passed as JSON in the request body
        data = json.loads(request.body.decode('utf-8'))
        print(data)

        return JsonResponse(data)

    except Exception as e:
        # Handle any exceptions that might occur during the prediction
        response_data = {'error': str(e)}
        return JsonResponse(response_data, status=500)
