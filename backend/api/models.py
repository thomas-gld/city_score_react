from django.db import models
from django.contrib.auth.models import User  # sytème User par défault de django


# Create your models here.
class Ville(models.Model):
    name = models.CharField(max_length=100)
    pop = models.IntegerField()
    age = models.IntegerField()
    description = models.TextField(default="Pas de description")

    def __str__(self):
        return self.name


class Climat(models.Model):
    ville = models.OneToOneField(
        Ville,
        on_delete=models.CASCADE,
        related_name="climat",
        db_column="villeId"   
    )
    temp_max = models.IntegerField()
    temp_min = models.IntegerField()
    sun_hours = models.IntegerField()


class Loisir(models.Model):
    ville = models.ForeignKey(
        Ville,
        on_delete=models.CASCADE,
        related_name="loisirs",
        db_column="villeId"
    )
    nb_theatre = models.IntegerField()
    nb_gymnase = models.IntegerField()
    nb_musee = models.IntegerField()


class Localisation(models.Model):
    ville = models.OneToOneField(
        Ville,
        on_delete=models.CASCADE,
        related_name="localisation",
        db_column="villeId"
    )
    dist_mer = models.IntegerField()
    dist_montagne = models.IntegerField()
    longitude = models.FloatField()
    latitude = models.FloatField()



class Lieux(models.Model):
    ville = models.OneToOneField(
        Ville,
        on_delete=models.CASCADE,
        related_name="lieux",
        db_column="villeId"
    )
    nb_bars = models.IntegerField()
    nb_restaurants = models.IntegerField()
    nb_soins = models.IntegerField()
    nb_parcs = models.IntegerField()
    

class Users(models.Model): 
    name = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    
class Users(models.Model): 
    name = models.CharField(max_length=30)
    password = models.CharField(max_length=30)

    def __str__(self):
        return self.name