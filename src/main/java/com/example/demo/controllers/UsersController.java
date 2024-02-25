package com.example.demo.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.models.User;
import com.example.demo.models.UserRepository;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
public class UsersController {  
    
    @Autowired
    private UserRepository userRepo;

    @GetMapping("/users/view")
    public String getAllUsers(Model model){
        System.out.println("Getting all users");
        // get all users from database
        List<User> users = userRepo.findAll();
        // end of database call
        model.addAttribute("us", users);
        return "users/showAll";
    }

    // PostMapping to add new user
@PostMapping("/users/add")
    public String addUser(@RequestParam Map<String, String> newuser, HttpServletResponse response){
        System.out.println("ADD user");
        String newName = newuser.get("name");
       
        int newWeight = Integer.parseInt(newuser.get("weight"));
        int newHeight = Integer.parseInt(newuser.get("height"));
        String newHairColor = newuser.get("hairColor");
        double newGpa = Double.parseDouble(newuser.get("gpa"));
        userRepo.save(new User(newName,newWeight,newHeight,newHairColor,newGpa));
        return "redirect:/users/view";
    }

    // PostMapping to delete user
@PostMapping("/users/delete")
public String deleteUser(@RequestParam("id") int userId, HttpServletResponse response) {
    System.out.println("DELETE user");
    if (userRepo.existsById(userId)) {
        userRepo.deleteById(userId);
    } 
    return "redirect:/users/view"; 
}

public String postMethodName(@RequestBody String entity) {
    
    return entity;
}
    // GetMapping To Retrieve Student ID
@GetMapping("/users/edit")
    public String editUserPage(@RequestParam("id") int sid, Model model, HttpServletResponse response) {
        User user = userRepo.findById(sid).orElse(null);
        if (user != null) {
            model.addAttribute("user", user);
            response.setStatus(HttpServletResponse.SC_OK);
            return "users/updateUserForm";
        } else {
            response.setStatus(HttpServletResponse.SC_OK);
            return "users/userNotFound";
        }
    }

    @PostMapping("/users/update")
    public String updateUser(@ModelAttribute User user, HttpServletResponse response) {
        Optional<User> existingUser = userRepo.findById(user.getSid());

        if (existingUser.isPresent()) {

            userRepo.save(user);
            response.setStatus(HttpServletResponse.SC_OK);
            return "redirect:/users/view"; 
        } else {
            response.setStatus(HttpServletResponse.SC_OK);
            return "/users/userNotFound"; 
        }
    }
}



