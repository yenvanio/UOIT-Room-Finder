//
//  ViewController.swift
//  UOIT Room Finder iOS
//
//  Created by Shivanouyen Yoganathan on 2018-08-17.
//  Copyright © 2018 Shivanouyen Yoganathan. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UITextFieldDelegate {
    
    // MARK: Properties
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var nameLabel: UILabel!
    
    // MARK: UITextFieldDelegate
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        // Hide the keyboard.
        textField.resignFirstResponder()
        return true
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        nameLabel.text = textField.text
    }
    
    // MARK: Actions
    @IBAction func nameButton(_ sender: UIButton) {
        nameLabel.text = "Shiv Y."
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Use "self" (View Controller) as the delegate for the text field
        nameTextField.delegate = self
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}

